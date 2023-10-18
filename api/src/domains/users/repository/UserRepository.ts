import { UserInterface } from "../models/User";
import { PayloadParams } from "../types/PayloadParams";

export interface UserRepository {
    encryptPassword(password: string): Promise<string>;
    create(user: UserInterface): Promise<UserInterface>;
    getAll(): Promise<UserInterface[]>;
    getById(id: string): Promise<UserInterface | null>;
    update(id: string, body: UserInterface, loggedUser: PayloadParams): Promise<UserInterface>;
    delete(id: string): Promise<void>;
    checkPassword(oldPassword: string, newPassword: string): Promise<boolean>;
    updatePassword(id: string, newPassword: string, oldPassword: string, loggedUser: PayloadParams): Promise<void>;
}
