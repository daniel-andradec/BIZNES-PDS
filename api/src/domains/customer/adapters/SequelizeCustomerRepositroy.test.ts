import { Customer, CustomerCreationAttributes} from '../models/Customer';
import { UserService } from '../../users/ports/UserService';
import { AddressService } from '../../address/ports/AddressService';
import { CustomerService } from '../ports/CustomerService';
import { User } from '../../users/models/User';

function createMockSequelizeModel() {
  return {
    belongsTo: jest.fn(),
    hasOne: jest.fn(),
    findByPk: jest.fn(),
  };
}

jest.mock('../../users/models/User', () => {
  return { User: createMockSequelizeModel()};
});

jest.mock('../../address/models/Address', () => {
  return { Address: createMockSequelizeModel() };
});

jest.mock('../models/Customer', () => ({
  Customer: {
      create: jest.fn(),
      findOne: jest.fn(),
      findAll: jest.fn(),
      findByPk: jest.fn(),
      destroy: jest.fn(),
      update: jest.fn(),
      upsert: jest.fn(),
  }
}));

jest.mock('../../users/ports/UserService');
jest.mock('../../address/ports/AddressService');

describe('Teste de criação de cliente',  () => {

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

    test('cria usuário com sucesso', async () => {
      const customerData: CustomerCreationAttributes = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890',
        CPF: '123.456.789-09',
        birthDate: '1990-01-01',
        street: 'Street',
        number: 123,
        complement: 'Complement',
        neighborhood: 'Neighborhood',
        city: 'City',
        state: 'State',
        cep: '12345-678',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      UserService.create = jest.fn().mockResolvedValue({ idUser: '1', ...customerData });
      AddressService.create = jest.fn().mockResolvedValue({});
      Customer.create = jest.fn().mockResolvedValue(customerData);
      const result = await CustomerService.create(customerData);
      expect(UserService.create).toHaveBeenCalledWith(expect.objectContaining({
        name: customerData.name,
        email: customerData.email,
        password: customerData.password,
      }));
      expect(AddressService.create).toHaveBeenCalled();
      expect(Customer.create).toHaveBeenCalledWith(expect.objectContaining({
        phone: customerData.phone,
        CPF: customerData.CPF,
        birthDate: customerData.birthDate,
      }));
      expect(result).toEqual(expect.objectContaining(customerData));
    });
  });

  describe('getAll', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks
  });

    test('retorna todos os clientes', async () => {
      const customer1 = {
        idCustomer: '1',
        phone: '1234567890',
        CPF: '123.456.789-09',
        birthDate: '1990-01-01',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const customer2 = {
        idCustomer: '2',
        phone: '1234567890',
        CPF: '123.456.789-09',
        birthDate: '1990-01-01',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockCustomers = [customer1, customer2];
      Customer.findAll = jest.fn().mockResolvedValue(mockCustomers);
      const result = await CustomerService.getAll();
      expect(Customer.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockCustomers);
    });
  });

  describe('getLogged', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
  });

    test('retorna o cliente logado', async () => {
      const idUser = '1';
      const mockCustomer = {};
      const mockUser = {};
      const mockAddress = {};
      Customer.findOne = jest.fn().mockResolvedValue(mockCustomer);
      UserService.getById = jest.fn().mockResolvedValue(mockUser);
      AddressService.getAddress = jest.fn().mockResolvedValue(mockAddress);
      const result = await CustomerService.getLogged(idUser);
      expect(Customer.findOne).toHaveBeenCalledWith({ where: { idUser } });
      expect(UserService.getById).toHaveBeenCalledWith(idUser);
      expect(AddressService.getAddress).toHaveBeenCalledWith(idUser);
      expect(result).toEqual({ customer: mockCustomer, address: mockAddress, user: mockUser });
    });
  });

  describe('getById', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
  });

    test('retona o cliente pelo ID', async () => {
      const id = '1';
      const mockCustomer = {};
      Customer.findByPk = jest.fn().mockResolvedValue(mockCustomer);
      const result = await CustomerService.getById(id);
      expect(Customer.findByPk).toHaveBeenCalledWith(id, expect.any(Object));
      expect(result).toEqual(mockCustomer);
    });

    test('cliente não encontrado', async () => {
      const id = '1';
      Customer.findByPk = jest.fn().mockResolvedValue(null);
      await expect(CustomerService.getById(id)).rejects.toThrow('Não há usuário com o ID 1!');
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
  });

    test('deleta cliente com sucesso', async () => {
      const loggedUser = { idUser: '1', role: 'admin', name: 'John Doe', email: 'email@gmail.com' };
      const mockCustomer = { idUser: '1' };

      CustomerService.getById = jest.fn().mockResolvedValue(mockCustomer);

      Customer.findByPk= jest.fn().mockResolvedValue(mockCustomer);
  
      await CustomerService.delete('1', loggedUser);
  
      expect(UserService.delete).toHaveBeenCalledTimes(1);
    });

    test('Usuário não pode deletar outro usuário', async () => {
      const loggedUser = { idUser: '1', role: 'customer', name: 'John Doe', email: 'email@gmail.com' };

      const deletedUser = { idUser: '2', role: 'customer', name: 'Avelar', email: 'avelar@gmail.com'}

      CustomerService.getById = jest.fn().mockResolvedValue(deletedUser);

      Customer.findByPk= jest.fn().mockResolvedValue(deletedUser);

      await expect(CustomerService.delete('2', loggedUser)).rejects.toThrow('Vcê não tem permissão para deletar outro usuário');
  });
});

describe('update', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });


  test('atualiza cliente com sucesso', async () => {
    const idCustomer = '1';
    const mockCustomer = {idUser: '1'};

    const updatedCustomerData: CustomerCreationAttributes = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'newPassword123', 
      phone: '9876543210',
      CPF: '987.654.321-98',
      birthDate: '1990-02-01',
      street: 'New Street',
      number: 456,
      complement: 'New Complement',
      neighborhood: 'New Neighborhood',
      city: 'New City',
      state: 'New State',
      cep: '98765-432',
      createdAt: new Date(), 
      updatedAt: new Date(), 
    };

    const mockUserData = { idUser: '1'};
        const mockUserInstance = {
            ...mockUserData,
            get: jest.fn().mockReturnValue(mockUserData)
        };

    (User.findByPk as jest.MockedFunction<typeof User.findByPk>).mockResolvedValue(mockUserInstance as any);
    UserService.getById = jest.fn().mockResolvedValue(mockUserData.idUser);

    Customer.findByPk= jest.fn().mockResolvedValue(mockCustomer);

    await CustomerService.update(updatedCustomerData, idCustomer);

    AddressService.create = jest.fn().mockResolvedValue({});

    expect(UserService.update).toHaveBeenCalledTimes(1);
    expect(Customer.update).toHaveBeenCalledTimes(1);
    expect(AddressService.update).toHaveBeenCalledTimes(1);
  });

});


