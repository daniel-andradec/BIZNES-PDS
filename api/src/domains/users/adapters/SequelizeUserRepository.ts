import { User, UserInterface } from "../models/User"; 
import { UserRepository } from "../repository/UserRepository";
import { hash, compare } from 'bcrypt';
import { userRoles } from '../constants/userRoles';
import { NotAuthorizedError } from '../../../../errors/NotAuthorizedError';
import { PermissionError } from '../../../../errors/PermissionError';
import { QueryError } from '../../../../errors/QueryError';
import { PayloadParams } from '../types/PayloadParams';

export class SequelizeUserRepository implements UserRepository {
    async encryptPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return await hash(password, saltRounds);
    }

    async create(user: UserInterface): Promise<UserInterface> {
        try {
            if (user.role == userRoles.admin) {
                throw new PermissionError('Não é possível criar um usuário com cargo de administrador!');
            }

            const existingUser = await User.findOne({ where: { email: user.email } });
            if (existingUser) {
                throw new QueryError('E-mail já cadastrado!');
            }

            user.password = await this.encryptPassword(user.password);
            const createdUser = await User.create(user);
            return createdUser.get() as UserInterface;
        } catch (error) {
            throw(error);
        }
    }

    async getAll(): Promise<UserInterface[]> {
        try {
            const users = await User.findAll({
                attributes: ['idUser', 'name', 'email', 'role']
            });

            if (!users || users.length === 0) {
                throw new QueryError('Não há nenhum usuário cadastrado');
            }

            return users.map(user => user.get() as UserInterface);
        } catch (error) {
            throw(error);
        }
    }

    async getById(id: string): Promise<UserInterface | null> {
        try {
            const user = await User.findByPk(id, { 
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });

            if (!user) {
                throw new QueryError(`Não há um usuário com o ID ${id}!`);
            }

            return user.get() as UserInterface;
        } catch (error) {
            throw(error);
        }
    }

    async update(id: string, userToUpdate: UserInterface): Promise<UserInterface> {
        try {
            const user = await this.getById(id);
    
            if (userToUpdate.password) {
                userToUpdate.password = await this.encryptPassword(userToUpdate.password);
            }
    
            await User.update(userToUpdate, { where: { idUser: id } });
    
            const updatedUser = await this.getById(id);
            if (!updatedUser) {
                throw new Error("Erro ao atualizar o usuário.");
            }
            return updatedUser;
        } catch (error) {
            throw(error);
        }
    }    

    async delete(id: string): Promise<void> {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new QueryError(`Não há um usuário com o ID ${id}!`);
            }
            await user.destroy();
        } catch (error) {
            throw(error);
        }
    }

    async checkPassword(password: string, userId: string): Promise<boolean> {
        try {
            const user = await User.findByPk(userId);
            if (user) {
                return await compare(password, user.password);
            }
            return false;
        } catch (error) {
            console.error("Erro enquanto checava senha: ", error);
            return false;
        }
    }

    async updatePassword(id: string, newPassword: string, oldPassword: string, loggedUser: PayloadParams): Promise<void> {
        try {
            if (loggedUser.role !== userRoles.admin && loggedUser.idUser !== id) {
                throw new NotAuthorizedError('Você não tem permissão para editar outro usuário!');
            }

            if (await this.checkPassword(oldPassword, id)) {
                const encryptedNewPassword = await this.encryptPassword(newPassword);
                await User.update({ password: encryptedNewPassword }, { where: { idUser: id } });
            } else {
                throw new PermissionError('Senha incorreta!');
            }
        } catch (error) {
            throw(error);
        }
    }
}
