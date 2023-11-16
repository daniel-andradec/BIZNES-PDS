import { Vendor, VendorInterface, VendorCreationAttributes } from "../models/Vendor";
import { VendorService } from "../ports/VendorService";
import { User, UserInterface } from "../../users/models/User";
import { Address, AddressInterface } from "../../address/models/Address";
import { UserService } from "../../users/ports/UserService";
import { AddressService } from "../../address/ports/AddressService";
import { validateRegisterVendor, validateUpdateVendor } from "../../../../utils/functions/validation/validateVendor";

jest.mock('../models/Vendor', () => ({
    Vendor: {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
        findByPk: jest.fn(),
    }
}));

jest.mock('../../../../utils/functions/validation/validateVendor', () => ({
    validateRegisterVendor: jest.fn(),
    validateUpdateVendor: jest.fn(),
}));

describe("Teste de criação de loja", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test("Cria uma loja com sucesso", async () => {
        const vendor: VendorCreationAttributes = {
            idVendor: "1",
            idUser: "1",
            CNPJ: "11111111111111",
            companyName: "companyName",
            fantasyName: "fantasyName",
            phone: "phone",
            devolutionPolicy: "devolutionPolicy",
            name: "name",
            email: "email@gmail.com",
            password: "password",
            street: "street",
            number: 123,
            complement: "complement",
            neighborhood: "neighborhood",
            city: "city",
            state: "state",
            cep: "cep",
        } as VendorCreationAttributes; 
        const user: UserInterface = {
            idUser: "1",
            name: "name",
        } as UserInterface;
        const address: AddressInterface = {
            idAddress: "1",
        } as AddressInterface;
        jest.spyOn(UserService, 'create').mockImplementationOnce(() => Promise.resolve(user));
        jest.spyOn(AddressService, 'create').mockImplementationOnce(() => Promise.resolve(address));
        const spy = jest.spyOn(Vendor, 'create').mockResolvedValueOnce(vendor);
        const result = await VendorService.create(vendor);
        expect(result).toEqual(vendor);
        expect(spy).toHaveBeenCalledTimes(1);
    });
});

describe("Teste de busca de lojas", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test("Busca todas as lojas", async () => {
        const vendors: VendorInterface[] = [
            {
                idVendor: "1",
                idUser: "1",
                CNPJ: "CNPJ",
                companyName: "companyName",
                fantasyName: "fantasyName",
                phone: "phone",
                devolutionPolicy: "devolutionPolicy",
            }
        ] as VendorInterface[];
        const spy = jest.spyOn(Vendor, 'findAll').mockResolvedValueOnce(vendors);
        const result = await VendorService.getAll();
        expect(result).toEqual(vendors);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    test("Busca uma loja", async () => {
        const vendor: VendorInterface = {
            idVendor: "1",
            idUser: "1",
            CNPJ: "CNPJ",
            companyName: "companyName",
            fantasyName: "fantasyName",
            phone: "phone",
            devolutionPolicy: "devolutionPolicy",
        } as VendorInterface;
        const spy = jest.spyOn(Vendor, 'findOne').mockResolvedValueOnce(vendor);
        const result = await VendorService.getById("1");
        expect(result).toEqual(vendor);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    test("Busca loja do user logado", async () => {
        const vendor: VendorInterface = {
            idVendor: "1",
            idUser: "1",
            CNPJ: "CNPJ",
            companyName: "companyName",
            fantasyName: "fantasyName",
            phone: "phone",
            devolutionPolicy: "devolutionPolicy",
        } as VendorInterface;
        const user: UserInterface = {
            idUser: "1",
            name: "name",
        } as UserInterface;
        const address: AddressInterface = {
            idAddress: "1",
        } as AddressInterface;
        jest.spyOn(UserService, 'getById').mockImplementationOnce(() => Promise.resolve(user));
        jest.spyOn(AddressService, 'getAddress').mockImplementationOnce(() => Promise.resolve(address));
        const spy = jest.spyOn(Vendor, 'findOne').mockResolvedValueOnce(vendor);
        const result = await VendorService.getLogged("1");
        expect(result).toEqual({vendor, address, user});
        expect(spy).toHaveBeenCalledTimes(1);
    });
});

describe("Teste de atualização de loja", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test("Atualiza uma loja com sucesso", async () => {
        const body: VendorCreationAttributes = {
            idVendor: "1",
            idUser: "1",
            CNPJ: "CNPJ",
            companyName: "companyName",
            fantasyName: "fantasyName",
            phone: "phone",
            devolutionPolicy: "devolutionPolicy",
        } as VendorCreationAttributes;
        const vendor: VendorInterface = {
            idVendor: "1",
        } as VendorInterface;
        const user: UserInterface = {
            idUser: "1",
            name: "name",
        } as UserInterface;
        const address: AddressInterface = {
            idAddress: "1",
        } as AddressInterface;
        jest.spyOn(UserService, 'getById').mockImplementationOnce(() => Promise.resolve(user));
        jest.spyOn(VendorService, 'getById').mockImplementation(() => Promise.resolve(vendor));
        jest.spyOn(Vendor, 'findOne').mockResolvedValue(vendor);
        jest.spyOn(UserService, 'update').mockImplementationOnce(() => Promise.resolve(user));
        jest.spyOn(AddressService, 'update').mockImplementationOnce(() => Promise.resolve(address));
        const spy = jest.spyOn(Vendor, 'update').mockResolvedValueOnce([1]);
        const result = await VendorService.update("1", body);
        expect(result).toEqual({'idVendor': '1'});
        expect(spy).toHaveBeenCalledTimes(1);
    });
});

describe("Teste de deleção de loja", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test("Deleta uma loja com sucesso", async () => {
        const vendor: VendorInterface = {
            idVendor: "1",
        } as VendorInterface;
        const spy = jest.spyOn(UserService, 'delete').mockImplementationOnce(() => Promise.resolve());
        jest.spyOn(User, 'findByPk').mockResolvedValueOnce(vendor);
        jest.spyOn(Vendor, 'findOne').mockResolvedValueOnce(vendor);
        const result = await VendorService.delete("1");
        expect(spy).toHaveBeenCalledTimes(1);
    });
});



