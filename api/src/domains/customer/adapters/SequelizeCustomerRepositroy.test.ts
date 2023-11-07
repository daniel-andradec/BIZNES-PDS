import { SequelizeCustomerRepository } from './SequelizeCustomerRepository';
import { Customer, CustomerCreationAttributes } from '../models/Customer';
import { UserService } from '../../users/ports/UserService';
import { AddressService } from '../../address/ports/AddressService';
import { CustomerService } from '../ports/CustomerService';
import { User } from '../../users/models/User';

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

    test('should create a new customer and return the created customer', async () => {
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

    test('should retrieve all customers', async () => {
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

    test('should retrieve the logged customer', async () => {
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

    test('should retrieve a customer by id', async () => {
      const id = '1';
      const mockCustomer = {};
      Customer.findByPk = jest.fn().mockResolvedValue(mockCustomer);
      const result = await CustomerService.getById(id);
      expect(Customer.findByPk).toHaveBeenCalledWith(id, expect.any(Object));
      expect(result).toEqual(mockCustomer);
    });

    test('should throw an error when customer is not found', async () => {
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

    test('should delete a customer', async () => {
      const loggedUser = { idUser: '1', role: 'admin', name: 'John Doe', email: 'email@gmail.com' };
      const mockCustomer = { idUser: '1' };
  
      // Mock the getById method to return the mockCustomer
      CustomerService.getById = jest.fn().mockResolvedValue(mockCustomer);
  
      // Call the delete method of CustomerService
      await CustomerService.delete('1', loggedUser);
  
      //user service delete deves ser chamado uma vez
      expect(UserService.delete).toHaveBeenCalledTimes(1);
    });

    test('Usuário não pode deletar outro usuário', async () => {
      const loggedUser = { idUser: '1', role: 'customer', name: 'John Doe', email: 'email@gmail.com' };

      const deletedUser = { idUser: '2', role: 'customer', name: 'Avelar', email: 'avelar@gmail.com'}

      // Mock the getById method to return the mockCustomer
      CustomerService.getById = jest.fn().mockResolvedValue(deletedUser);

      // Call the delete method of CustomerService
      await expect(CustomerService.delete('2', loggedUser)).rejects.toThrow('Você não tem permissão para deletar outro usuário');
});
  
});
