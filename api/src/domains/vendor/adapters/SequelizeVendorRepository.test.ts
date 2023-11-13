import { Vendor, VendorCreationAttributes } from "../models/Vendor";
import { VendorService } from "../ports/VendorService";
import { UserService } from "../../users/ports/UserService";
import { AddressService } from "../../address/ports/AddressService";
import { User } from "../../users/models/User";

function createMockSequelizeModel() {
  return {
    belongsTo: jest.fn(),
    hasOne: jest.fn(),
    findByPk: jest.fn(),
  };
}

jest.mock("../../users/models/User", () => {
  return { User: createMockSequelizeModel() };
});

jest.mock("../../address/models/Address", () => {
  return { Address: createMockSequelizeModel() };
});

jest.mock("../models/Vendor", () => ({
  Vendor: {
    create: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    destroy: jest.fn(),
    update: jest.fn(),
    upsert: jest.fn(),
  },
}));

jest.mock("../../users/ports/UserService");

jest.mock("../../address/ports/AddressService");

describe("Teste de criação de fornecedor", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  test("cria fornecedor com sucesso", async () => {
    const vendorData: VendorCreationAttributes = {
        name: "John Doe",
        email: "email@gmail.com",
        password: "password123",
        phone: "1234567890",
        CNPJ: "12345678901234",
        companyName: "Company",
        fantasyName: "Fantasy",
        devolutionPolicy: "Policy",
        street: "Street",
        number: 123,
        complement: "Complement",
        neighborhood: "Neighborhood",
        city: "City",
        state: "State",
        cep: "12345-678",
        createdAt: new Date(),
        updatedAt: new Date(),
        idUser: "",
        idVendor:"1"
    };

    UserService.create = jest.fn().mockResolvedValue(vendorData);
    AddressService.create = jest.fn().mockResolvedValue({});
    Vendor.create = jest.fn().mockResolvedValue(vendorData);

    const result = await VendorService.create(vendorData);


    expect(UserService.create).toHaveBeenCalledWith(expect.objectContaining({
        name: vendorData.name,
        email:vendorData.email,
        password: vendorData.password,
      }))
    expect(AddressService.create).toHaveBeenCalled();
    expect(result).toEqual(expect.objectContaining(vendorData));
    });
});

describe('getAll', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks
  });

    test('retorna todos os clientes', async () => {
      const vendor1 = {
        idVendor: '1',
        phone: '1234567890',
        CPF: '123.456.789-09',
        birthDate: '1990-01-01',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const vendor2 = {
        idVendor: '2',
        phone: '1234567890',
        CPF: '123.456.789-09',
        birthDate: '1990-01-01',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockCustomers = [vendor1, vendor2];
      Vendor.findAll = jest.fn().mockResolvedValue(mockCustomers);
      const result = await VendorService.getAll();
      expect(Vendor.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockCustomers);
    });
  });

  describe('getById', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
  });

    test('retona o cliente pelo ID', async () => {
      const id = '1';
      const mockVendor = {};
      Vendor.findByPk = jest.fn().mockResolvedValue(mockVendor);
      Vendor.findOne = jest.fn().mockResolvedValue(mockVendor);
      const result = await VendorService.getById(id);
      expect(result).toEqual(mockVendor);
    });

    test('cliente não encontrado', async () => {
      const id = '1';
      Vendor.findByPk = jest.fn().mockResolvedValue(null);
      await expect(VendorService.getById(id)).rejects.toThrow('Não há loja com o ID 1!');
    });
  });

  describe('getLogged', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
  });

    test('retorna o cliente logado', async () => {
      const idUser = '1';
      const mockVendor = {};
      const mockUser = {};
      const mockAddress = {};
      Vendor.findOne = jest.fn().mockResolvedValue(mockVendor);
      UserService.getById = jest.fn().mockResolvedValue(mockUser);
      AddressService.getAddress = jest.fn().mockResolvedValue(mockAddress);
      const result = await VendorService.getLogged(idUser);
      expect(Vendor.findOne).toHaveBeenCalledWith({ where: { idUser } });
      expect(UserService.getById).toHaveBeenCalledWith(idUser);
      expect(AddressService.getAddress).toHaveBeenCalledWith(idUser);
      expect(result).toEqual({ vendor: mockVendor, address: mockAddress, user: mockUser });
    });
  });

  describe('update', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
  });

    test('atualiza o cliente', async () => {
      const idVendor = '1';
      const mockVendor = {idVendor: '1'};

      const updateVendorData: VendorCreationAttributes = {
        name: "John Doe",
        email: "email@gmail.com",
        password: "password123",
        phone: "1234567890",
        CNPJ: "12345678901234",
        companyName: "Company",
        fantasyName: "Fantasy",
        devolutionPolicy: "Policy",
        street: "Street",
        number: 123,
        complement: "Complement",
        neighborhood: "Neighborhood",
        city: "City",
        state: "State",
        cep: "12345-678",
        createdAt: new Date(),
        updatedAt: new Date(),
        idVendor:"1",
        idUser: "1"
    };

      VendorService.getById = jest.fn().mockResolvedValue(mockVendor);
      const mockUserData = { idUser: '1'};
      const mockUserInstance = {
              ...mockUserData,
              get: jest.fn().mockReturnValue(mockUserData)
          };

      (User.findByPk as jest.MockedFunction<typeof User.findByPk>).mockResolvedValue(mockUserInstance as any);
      UserService.getById = jest.fn().mockResolvedValue(mockUserData.idUser);
      
      Vendor.findByPk = jest.fn().mockResolvedValue(mockVendor);
      Vendor.findOne = jest.fn().mockResolvedValue(mockVendor);

      await VendorService.update(idVendor, updateVendorData);
      expect(UserService.update).toHaveBeenCalledTimes(1);
      expect(Vendor.update).toHaveBeenCalledTimes(1);
      expect(AddressService.update).toHaveBeenCalledTimes(1);

    });
    
  });

describe('delete', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
  });

    test('deleta o vendedor', async () => {
      const idVendor = '1';
      const mockVendor = {idVendor: '1'};
      VendorService.getById = jest.fn().mockResolvedValue(mockVendor);

      const mockUserData = { idUser: '1'};
      const mockUserInstance = {
              ...mockUserData,
              get: jest.fn().mockReturnValue(mockUserData)
          };
      
      (User.findByPk as jest.MockedFunction<typeof User.findByPk>).mockResolvedValue(mockUserInstance as any);
      UserService.getById = jest.fn().mockResolvedValue(mockUserData.idUser);
      
      Vendor.findByPk = jest.fn().mockResolvedValue(mockVendor);
      Vendor.findOne = jest.fn().mockResolvedValue(mockVendor);
      (User.findByPk as jest.MockedFunction<typeof User.findByPk>).mockResolvedValue(mockUserInstance as any);
      UserService.getById = jest.fn().mockResolvedValue(mockUserData.idUser);
      await VendorService.delete(idVendor);
      expect(UserService.delete).toHaveBeenCalledTimes(1);
    });

    test('vendedor não encontrado', async () => {
      const id = '1';
      Vendor.findByPk = jest.fn().mockResolvedValue(null);
      await expect(VendorService.delete(id)).rejects.toThrow('Não há loja com o ID 1!');
    });
  });
