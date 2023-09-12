import { hash } from 'bcrypt';
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
  }

  async getAll() {
    const users = await User.findAll({

      attributes: ['id', 'name', 'email', 'role'],

    });

    if (!users) {
      throw new QueryError('Não há nenhum usuário cadastrado');
    }
    
    return users;
    
  }

  async getById(id: string) {
    const user = await User.findByPk(id, {attributes:
      {
        exclude: ['password', 'createdAt', 'updatedAt'],
      }});

    if (!user) {
      throw new QueryError(`Não há um usuário com o ID ${id}!`);
    }

    return user;
  }

  async update(id: string, body: UserInterface, loggedUser: PayloadParams){
    if (loggedUser.role != userRoles.admin && loggedUser.idUser != id) {
      throw new NotAuthorizedError('Você não tem permissão para editar outro usuário!');
    }

    if (body.role && loggedUser.role != userRoles.admin && loggedUser.role != body.role) {
      throw new NotAuthorizedError('Você não tem permissão para editar seu cargo!');
    }

    const user = await this.getById(id);
    
    if (body.password) {
      body.password = await this.encryptPassword(body.password);
    }

    await user.update(body);
  }

  async delete(id: string, idReqUser: string) {
    if (idReqUser == id) {
      throw new PermissionError('Não é possível deletar o próprio usuário!');
    }
    
    const user = await this.getById(id);
    await user.destroy();
  }
}

export const UserService = new UserServiceClass();