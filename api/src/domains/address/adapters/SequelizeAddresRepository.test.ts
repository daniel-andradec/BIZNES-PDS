import { Address, AddressInterface } from "../models/Address";
import { AddressService } from "../ports/AddressService";

jest.mock('../models/Address', () => ({
    Address: {
        create: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
    }
}));

describe('Teste de criação de endereço', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test('Cria um endereço com sucesso', async () => {
        const newAddress = {
            street: 'Rua Teste',
            number: 123,
            complement: 'Complemento',
            neighborhood: 'Bairro Teste',
            city: 'Cidade Teste',
            state: 'Estado Teste',
            cep: '12345678',
            idUser: '1',
            idTransaction: '1',
        } as AddressInterface;

    (Address.create as jest.MockedFunction<typeof Address.create>).mockImplementation();

    await AddressService.create(newAddress);
    expect(Address.create).toHaveBeenCalledTimes(1);
    expect(Address.create).toHaveBeenCalledWith(newAddress);
    });

    test('Atualiza um endereço com sucesso', async () => {
        const newAddress = {
            street: 'Rua Teste',
            number: 123,
            complement: 'Complemento',
            neighborhood: 'Bairro Teste',
            city: 'Cidade Teste',
            state: 'Estado Teste',
            cep: '12345678',
            idUser: '1',
            idTransaction: '1',
        } as AddressInterface;

        (Address.update as jest.MockedFunction<typeof Address.update>).mockImplementation();

        // findOne deve retornar null
        (Address.findOne as jest.MockedFunction<typeof Address.findOne>).mockResolvedValue(newAddress);

        await AddressService.update(newAddress, newAddress.idUser);
        expect(Address.update).toHaveBeenCalledTimes(1);
        expect(Address.update).toHaveBeenCalledWith(newAddress, { where: { idUser: newAddress.idUser } });
    });

    describe('Teste de atualização de endereço', () => {
        beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
        });

        test('Atualiza um endereço com sucesso', async () => {
        const newAddress = {
            street: 'Rua Teste',
            number: 123,
            complement: 'Complemento',
            neighborhood: 'Bairro Teste',
            city: 'Cidade Teste',
            state: 'Estado Teste',
            cep: '12345678',
            idUser: '1',
            idTransaction: '1',
        } as AddressInterface;

        (Address.update as jest.MockedFunction<typeof Address.update>).mockImplementation();

        (Address.findOne as jest.MockedFunction<typeof Address.findOne>).mockResolvedValue(newAddress);

        await AddressService.update(newAddress, newAddress.idUser);
        expect(Address.update).toHaveBeenCalledTimes(1);
        expect(Address.update).toHaveBeenCalledWith(newAddress, { where: { idUser: newAddress.idUser } });
        });

    test('Lança erro quando não encontra o endereço', async () => {
        const newAddress = {
            street: 'Rua Teste',
            number: 123,
            complement: 'Complemento',
            neighborhood: 'Bairro Teste',
            city: 'Cidade Teste',
            state: 'Estado Teste',
            cep: '12345678',
            idUser: '1',
            idTransaction: '1',
        } as AddressInterface;

        (Address.update as jest.MockedFunction<typeof Address.update>).mockImplementation();

        (Address.findOne as jest.MockedFunction<typeof Address.findOne>).mockResolvedValue(null);

        await expect(AddressService.update(newAddress, newAddress.idUser)).rejects.toThrow('Endereço não encontrado após a atualização');
        });
    });

    describe('Teste de busca de endereço', () => {
        beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
        });

        test('Busca um endereço com sucesso', async () => {
        const newAddress = {
            street: 'Rua Teste',
            number: 123,
            complement: 'Complemento',
            neighborhood: 'Bairro Teste',
            city: 'Cidade Teste',
            state: 'Estado Teste',
            cep: '12345678',
            idUser: '1',
            idTransaction: '1',
        } as AddressInterface;

        (Address.findOne as jest.MockedFunction<typeof Address.findOne>).mockResolvedValue(newAddress);

        await AddressService.getAddress(newAddress.idUser);
        expect(Address.findOne).toHaveBeenCalledTimes(1);
        expect(Address.findOne).toHaveBeenCalledWith({ where: { idUser: newAddress.idUser } });
        });
    });
});
