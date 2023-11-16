import { Transaction, TransactionInterface } from "../models/Transaction";
import { TransactionService } from "../ports/TransactionService";
import { AddressInterface } from "../../address/models/Address";
import { TransactionProductInterface } from "../../transactionProduct/models/TransactionProduct";
import { Product, ProductInterface } from "../../product/models/Product";
import { Vendor, VendorInterface } from "../../vendor/models/Vendor";
import { TransactionProductService } from "../../transactionProduct/ports/TransactionProductService";

jest.mock('../models/Transaction', () => ({
    Transaction: {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
        findByPk: jest.fn(),
        belongsTo: jest.fn(),
        hasMany: jest.fn(),
    }
}));

jest.mock('../../transactionProduct/models/TransactionProduct', () => ({
    TransactionProduct: {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
        findByPk: jest.fn(),
        belongsTo: jest.fn(),
        hasMany: jest.fn(),
    }
}));

jest.mock('../../Address/models/Address', () => ({
    Address: {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
        findByPk: jest.fn(),
        belongsTo: jest.fn(),
        hasMany: jest.fn(),
    }
}));


describe("Teste de criação de Transaction", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test("Cria um Transaction com sucesso", async () => {
        const transaction: TransactionInterface = {
            idTransaction: "1",
            idUser: "1",
        } as TransactionInterface;
        const address: AddressInterface = {
            idAddress: "1",
            idUser: "1",
        } as AddressInterface;
        const transactionProducts: TransactionProductInterface[] = [{
            idTransactionProduct: "1",
            idProduct: "1",
            idTransaction: "1",
            quantity: 10,
            selectedOption: "selectedOption",
            price: 10,
            productName: "productName",
            productPhoto: "productPhoto",
            productCategory: "productCategory",
            vendorName: "vendorName",
            idVendor: "idVendor",
        }] as TransactionProductInterface[];
        const product: ProductInterface = {
            idProduct: "1",
            photo: "photo",
            name: "name",
            category: "category",
        } as ProductInterface;
        const vendor: VendorInterface = {
            idVendor: "1",
            fantasyName: "fantasyName",
        } as VendorInterface;
        jest.spyOn(TransactionProductService, 'create').mockResolvedValueOnce(transactionProducts[0]);
        const spy = jest.spyOn(Product, 'findByPk').mockResolvedValue(product);
        const spy2 = jest.spyOn(Vendor, 'findByPk').mockResolvedValueOnce(vendor);
        const spy3 = jest.spyOn(Transaction, 'create').mockResolvedValueOnce(transaction);
        const result = await TransactionService.create(transaction, transactionProducts, address);
        expect(result).toEqual(transaction);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy2).toHaveBeenCalledTimes(1);
        expect(spy3).toHaveBeenCalledTimes(1);
    });
});

describe("Teste de busca de Transactions", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test("Busca todos os Transactions com sucesso", async () => {
        const transaction: TransactionInterface = {
            idTransaction: "1",
            idUser: "1",
        } as TransactionInterface;
        const spy = jest.spyOn(Transaction, 'findAll').mockResolvedValueOnce([transaction]);
        const result = await TransactionService.getAll();
        expect(result).toEqual([transaction]);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    test("Busca um Transaction com sucesso", async () => {
        const transaction: TransactionInterface = {
            idTransaction: "1",
            idUser: "1",
        } as TransactionInterface;
        const spy = jest.spyOn(Transaction, 'findByPk').mockResolvedValueOnce(transaction);
        const result = await TransactionService.getById("1");
        expect(result).toEqual(transaction);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    test("Busca todas as Transactions pelo UserId com sucesso", async () => {
        const transaction: TransactionInterface = {
            idTransaction: "1",
            idUser: "1",
        } as TransactionInterface;
        const spy = jest.spyOn(Transaction, 'findAll').mockResolvedValueOnce([transaction]);
        const result = await TransactionService.getByUserId("1");
        expect(result).toEqual([transaction]);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    test("Busca todas as Transactions pelo VendorId com sucesso", async () => {
        const transaction: TransactionInterface = {
            idTransaction: "1",
            idUser: "1",
        } as TransactionInterface;
        const spy = jest.spyOn(Transaction, 'findAll').mockResolvedValueOnce([transaction]);
        const result = await TransactionService.getByVendorId("1");
        expect(result).toEqual([transaction]);
        expect(spy).toHaveBeenCalledTimes(1);
    });
});

describe("Teste de remoção de Transactions", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test("Remove um Transaction com sucesso", async () => {
        const spy = jest.spyOn(Transaction, 'destroy').mockResolvedValueOnce(1);
        const result = await TransactionService.delete("1");
        expect(result).toEqual(undefined);
        expect(spy).toHaveBeenCalledTimes(1);
    });
});