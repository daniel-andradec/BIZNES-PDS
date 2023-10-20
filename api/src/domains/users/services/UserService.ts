import { hash, compare } from 'bcrypt';
import { User, UserInterface } from '../models/User';
import { Attributes, CreationAttributes } from 'sequelize/types';
import { userRoles } from '../constants/userRoles';
import { NotAuthorizedError } from '../../../../errors/NotAuthorizedError';
import { PermissionError } from '../../../../errors/PermissionError';
import { QueryError } from '../../../../errors/QueryError';
import { PayloadParams } from '../types/PayloadParams';

class UserServiceClass {
  async encryptPassword(password: string) {
    const saltRounds = 10;
    const encryptedPassword = await hash(password, saltRounds);
    return encryptedPassword;
  }

  async create(body: CreationAttributes<UserInterface>) {
    try {
      if (body.role == userRoles.admin) {
        throw new PermissionError('Não é possível criar um usuário com cargo de administrador!');
      }

      const user = await User.findOne({where: {email: body.email}});

      if (user) {
        throw new QueryError('E-mail já cadastrado!');
      }

      const newUser = {
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role,
      };

      newUser.password = await this.encryptPassword(newUser.password);

      const createdUser = await User.create(newUser);
      return createdUser;
    } catch (error) {
      throw(error);
    }
  }

  async getAll() {
    try{
      const users = await User.findAll({

        attributes: ['idUser', 'name', 'email', 'role'],

      });

      if (!users) {
        throw new QueryError('Não há nenhum usuário cadastrado');
      }

      return users;
    } catch (error) {
      throw(error);
    }
  }

  async getById(id: string) {
    try {
      const user = await User.findByPk(id, {attributes:
        {
          exclude: ['createdAt', 'updatedAt'],
        }});

      if (!user) {
        throw new QueryError(`Não há um usuário com o ID ${id}!`);
      }

      return user;
    } catch (error) {
      throw(error);
    }
  }

  async update(id: string, body: CreationAttributes<UserInterface>){
    try {

      const user = await this.getById(id);

      if (body.password) {
        body.password = await this.encryptPassword(body.password);
      }

      await user.update(body);

    } catch (error) {
      throw(error);
    }
  }

  async delete(id: string, idReqUser: string) {
    try {
      const user = await this.getById(id);
      await user.destroy();
    } catch (error) {
      throw(error);
    }
  }

  async checkPassword(oldPassword: string, user: UserInterface) {
    try {
        return await compare(oldPassword, user.password);
    } catch (error) {
        console.error("Erro enquanto checava senha: ", error);
        return false;
    }
}

async updatePassword(id: string, newPassword: string, oldPassword: string, loggedUser: PayloadParams) {
    try {
        const user = await this.getById(id);
        if (loggedUser.role != userRoles.admin && loggedUser.idUser != user.idUser) {
            throw new NotAuthorizedError('Você não tem permissão para editar outro usuário!');
        }
        if (await this.checkPassword(oldPassword, user)) {
            user.password = await this.encryptPassword(newPassword);
            await user.save();
        } else {
            throw new PermissionError('Senha incorreta!');
        }
    } catch (error) {
        throw(error);
    }
  }
}

export const UserService = new UserServiceClass();