import { SequelizeUserRepository } from "./SequelizeUserRepository";
import { userRoles } from "../constants/userRoles";
import { PermissionError } from "../../../../errors/PermissionError";
import { User } from "../models/User";
import { QueryError } from "../../../../errors/QueryError";
import { UserInterface } from "../models/User";
import { UserService } from "../ports/UserService";
import * as bcrypt from 'bcrypt';
import { PayloadParams } from "../types/PayloadParams";

jest.mock('bcrypt');
jest.mock('../models/User', () => ({
    User: {
        create: jest.fn(),
        findOne: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
        destroy: jest.fn(),
        update: jest.fn(),
        upsert: jest.fn(),
    }
}));

describe('Teste de criação de usuário', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test('Cria um usuário com sucesso', async () => {
        const newUser = {
            name: 'Teste',
            email: 'email@gmail.com',
            password: '123456',
            role: userRoles.customer,
            idUser: '1',
        } as UserInterface;

        (User.create as jest.MockedFunction<typeof User.create>).mockImplementation(() => ({
            get: jest.fn().mockReturnValue({ return: newUser })
        }));

        await UserService.create(newUser);
        expect(User.create).toHaveBeenCalledTimes(1);
        expect(User.create).toHaveBeenCalledWith(newUser);
    });

    test('Lança erro quando o e-mail já está cadastrado', async () => {
        const newUser = {
            name: 'Teste',
            email: 'email@gmail.com',
            password: '123456',
            role: userRoles.customer,
            idUser: '1',
        } as UserInterface;

        (User.findOne as jest.MockedFunction<typeof User.findOne>).mockResolvedValue(newUser);
        await expect(UserService.create(newUser)).rejects.toThrow('E-mail já cadastrado!');
    });

    test('Lança erro ao tentar criar um usuário com cargo de administrador', async () => {
        const adminUser = {
            name: 'Admin',
            email: 'admin@gmail.com',
            password: 'admin123',
            role: userRoles.admin,
            idUser: '3',
        } as UserInterface;

        await expect(UserService.create(adminUser)).rejects.toThrow('Não é possível criar um usuário com cargo de administrador!');
    });
});

describe('Teste da listagem de usuários', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('Retorna todos os usuários', async () => {
        const mockUsers = [
            { idUser: '1', name: 'User1', email: 'user1@gmail.com', role: 'customer', get: jest.fn().mockReturnValue({ idUser: '1', name: 'User1', email: 'user1@gmail.com', role: 'customer' }) },
            { idUser: '2', name: 'User2', email: 'user2@gmail.com', role: 'customer', get: jest.fn().mockReturnValue({ idUser: '2', name: 'User2', email: 'user2@gmail.com', role: 'customer' }) }
        ] as unknown as UserInterface[];

        (User.findAll as jest.MockedFunction<typeof User.findAll>).mockResolvedValue(mockUsers);
        const result = await UserService.getAll();
        expect(result).toEqual([
            { idUser: '1', name: 'User1', email: 'user1@gmail.com', role: 'customer' },
            { idUser: '2', name: 'User2', email: 'user2@gmail.com', role: 'customer' }
        ]);
    });

    test('Lança erro quando não há usuários', async () => {
        (User.findAll as jest.MockedFunction<typeof User.findAll>).mockResolvedValue([]);
        await expect(UserService.getAll()).rejects.toThrow('Não há nenhum usuário cadastrado');
    });
});

describe('Teste do get de usuários pelo id', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('Retorna usuário pelo ID', async () => {
        const mockUserData = { idUser: '1', name: 'User1', email: 'user1@gmail.com', role: 'customer' };
        const mockUserInstance = {
            ...mockUserData,
            get: jest.fn().mockReturnValue(mockUserData)
        };

        (User.findByPk as jest.MockedFunction<typeof User.findByPk>).mockResolvedValue(mockUserInstance as any);
        const result = await UserService.getById('1');
        expect(result).toEqual(mockUserData);
    });

    test('Lança erro quando usuário não é encontrado pelo ID', async () => {
        (User.findByPk as jest.MockedFunction<typeof User.findByPk>).mockResolvedValue(null);
        await expect(UserService.getById('1')).rejects.toThrow('Não há um usuário com o ID 1!');
    });
});

describe('Teste de atualização de usuário', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('Atualiza usuário com sucesso', async () => {
        const user = {
            name: 'Teste',
            email: 'email@gmail.com',
            password: '123456',
            role: userRoles.customer,
            idUser: '1',
        };

        const mockUserInstance = {
            ...user,
            get: jest.fn().mockReturnValue(user)
        };

        (User.findByPk as jest.MockedFunction<typeof User.findByPk>).mockResolvedValue(mockUserInstance as any);
        const updatedUser = {
            name: 'TesteAtualizado',
            email: 'emailatualizado@gmail.com',
            password: '123456',
            role: userRoles.customer,
            idUser: '1',
        } as UserInterface;

        (User.update as jest.MockedFunction<typeof User.update>).mockResolvedValue([1]);
        await UserService.update('1', updatedUser);
        expect(User.update).toHaveBeenCalledTimes(1);
        expect(User.update).toHaveBeenCalledWith(updatedUser, { where: { idUser: '1' } });
    });

    test('Lança erro ao tentar atualizar usuário não existente', async () => {
        const updatedUser = {
            name: 'TesteAtualizado',
            email: 'emailatualizado@gmail.com',
            password: '123456',
            role: userRoles.customer,
            idUser: '1',
        } as UserInterface;

        (User.findByPk as jest.MockedFunction<typeof User.findByPk>).mockResolvedValue(null);
        await expect(UserService.update(updatedUser.idUser, updatedUser)).rejects.toThrow(`Não há um usuário com o ID 1!`);
    });
});

describe('Teste de remoção de usuário', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('Remove usuário com sucesso', async () => {
        const user = {
            name: 'Teste',
            email: 'teste@gmail.com',
            password: '123456',
            role: userRoles.customer,
            idUser: '1',
        };

        const mockUserInstance = {
            ...user,
            get: jest.fn().mockReturnValue(user),
            destroy: jest.fn().mockResolvedValue(undefined)
        };

        (User.findByPk as jest.MockedFunction<typeof User.findByPk>).mockResolvedValue(mockUserInstance as any);
        await UserService.delete('1');
        expect(mockUserInstance.destroy).toHaveBeenCalledTimes(1);
    });

    test('Lança erro ao tentar remover usuário que não existe', async () => {
        const id = '1';
        (User.findByPk as jest.MockedFunction<typeof User.findByPk>).mockResolvedValue(null);
        await expect(UserService.delete(id)).rejects.toThrow(`Não há um usuário com o ID ${id}!`);
    });
});

describe('Teste de autenticação de usuário', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('Retorna true quando o usuário é encontrado e a senha é correta', async () => {
        const userId = '1';
        const password = 'correctPassword';
        const hashedPassword = 'hashedPassword';

        const mockUser = {
            password: hashedPassword,
            get: jest.fn().mockReturnValue({ password: hashedPassword })
        };

        (User.findByPk as jest.MockedFunction<typeof User.findByPk>).mockResolvedValue(mockUser as any);
        (bcrypt.compare as jest.Mock<any, any>).mockResolvedValue(true);
        const result = await UserService.checkPassword(password, userId);
        expect(result).toBe(true);
    });

    test('Retorna false quando o usuário é encontrado e a senha é incorreta', async () => {
        const userId = '1';
        const password = 'wrongPassword';
        const hashedPassword = 'hashedPassword';

        const mockUser = {
            password: hashedPassword,
            get: jest.fn().mockReturnValue({ password: hashedPassword })
        };

        (User.findByPk as jest.MockedFunction<typeof User.findByPk>).mockResolvedValue(mockUser as any);
        (bcrypt.compare as jest.Mock<any, any>).mockResolvedValue(false);
        const result = await UserService.checkPassword(password, userId);
        expect(result).toBe(false);
    });

    test('Retorna false quando o usuário não é encontrado', async () => {
        const userId = '1';
        const password = 'anyPassword';

        (User.findByPk as jest.MockedFunction<typeof User.findByPk>).mockResolvedValue(null);
        const result = await UserService.checkPassword(password, userId);
        expect(result).toBe(false);
    });
});

describe('Teste de atualização de senha', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    test('Permite que um administrador atualize a senha', async () => {
        const id = '1';
        const oldPassword = 'oldPassword';
        const newPassword = 'newPassword';
        const encryptedNewPassword = 'encryptedNewPassword';
        const loggedUser = { role: userRoles.admin, idUser: 'admin' } as any;

        jest.spyOn(UserService, 'checkPassword').mockResolvedValue(true);
        (bcrypt.compare as jest.Mock<any, any>).mockResolvedValue(true);
        (User.findByPk as jest.MockedFunction<typeof User.findByPk>).mockResolvedValue(loggedUser as any);
        UserService.encryptPassword = jest.fn().mockResolvedValue(encryptedNewPassword);
        (User.update as jest.MockedFunction<typeof User.update>).mockResolvedValue([1]);
        await UserService.updatePassword(id, newPassword, oldPassword, loggedUser);
        expect(User.update).toHaveBeenCalledTimes(1);
    });

    test('Tenta atualizar a senha de um usuário sem permissão', async () => {
        const id = '1';
        const oldPassword = 'oldPassword';
        const newPassword = 'newPassword';
        const loggedUser = { role: userRoles.customer, idUser: '2' } as any;
        await expect(UserService.updatePassword(id, newPassword, oldPassword, loggedUser)).rejects.toThrow(new PermissionError('Você não tem permissão para editar outro usuário!'));
    });

    test('Senha antiga incorreta', async () => {
        const id = '1';
        const oldPassword = 'oldPassword';
        const newPassword = 'newPassword';
        const encryptedNewPassword = 'encryptedNewPassword';
        const loggedUser = { role: userRoles.admin, idUser: 'admin' } as any;

        jest.spyOn(UserService, 'checkPassword').mockResolvedValue(false);
        (bcrypt.compare as jest.Mock<any, any>).mockResolvedValue(false);
        (User.findByPk as jest.MockedFunction<typeof User.findByPk>).mockResolvedValue(loggedUser as any);
        UserService.encryptPassword = jest.fn().mockResolvedValue(encryptedNewPassword);
        (User.update as jest.MockedFunction<typeof User.update>).mockResolvedValue([1]);
        await expect(UserService.updatePassword(id, newPassword, oldPassword, loggedUser)).rejects.toThrow(new PermissionError('Senha incorreta!'));
    });
});
