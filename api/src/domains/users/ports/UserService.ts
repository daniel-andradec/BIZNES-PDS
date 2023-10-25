import { UserRepository } from "../repository/UserRepository";
import { UserInterface } from "../models/User";
import { PayloadParams } from "../types/PayloadParams";
import { CreationAttributes } from "sequelize/types";
import { SequelizeUserRepository } from "../adapters/SequelizeUserRepository";

class UserServiceClass{
    constructor(private userRepository: UserRepository) {}

    async encryptPassword(password: string): Promise<string> {
        return await this.userRepository.encryptPassword(password);
    }

    async create(user: CreationAttributes<UserInterface>): Promise<UserInterface> {
        return await this.userRepository.create(user);
    }

    async getAll(): Promise<UserInterface[]> {
        return await this.userRepository.getAll();
    }

    async getById(id: string): Promise<UserInterface | null> {
        return await this.userRepository.getById(id);
    }

    async update(id: string, userToUpdate: CreationAttributes<UserInterface>): Promise<UserInterface> {
        return await this.userRepository.update(id, userToUpdate);
    }

    async delete(id: string): Promise<void> {
        return await this.userRepository.delete(id);
    }

    async checkPassword(oldPassword: string, newPassword: string): Promise<boolean> {
        return await this.userRepository.checkPassword(oldPassword, newPassword);
    }

    async updatePassword(id: string, newPassword: string, oldPassword: string, loggedUser: PayloadParams): Promise<void> {
        return await this.userRepository.updatePassword(id, newPassword, oldPassword, loggedUser);
    }
}

const userRepository = new SequelizeUserRepository();
export const UserService = new UserServiceClass(userRepository);