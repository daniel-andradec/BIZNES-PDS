import { UserInterface } from "../models/User";
import { PayloadParams } from "../types/PayloadParams";
import { CreationAttributes } from "sequelize/types";

export interface UserRepository {
    encryptPassword(password: string): Promise<string>;
    create(user: CreationAttributes<UserInterface>): Promise<UserInterface>;
    getAll(): Promise<UserInterface[]>;
    getById(id: string): Promise<UserInterface | null>;
    update(id: string, body: CreationAttributes<UserInterface>): Promise<UserInterface>;
    delete(id: string): Promise<void>;
    checkPassword(oldPassword: string, newPassword: string): Promise<boolean>;
    updatePassword(id: string, newPassword: string, oldPassword: string, loggedUser: PayloadParams): Promise<void>;
}
