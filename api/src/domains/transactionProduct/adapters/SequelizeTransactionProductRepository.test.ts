import { TransactionProduct, TransactionProductInterface } from "../models/TransactionProduct";
import { TransactionProductService } from "../ports/TransactionProductService";
import { Attributes, CreationAttributes } from 'sequelize/types';
import { ProductService } from "../../product/ports/ProductService";
import { ProductInterface } from "../../product/models/Product";
import { Product } from "../../product/models/Product";

jest.mock('../models/TransactionProduct', () => ({
    TransactionProduct: {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
        findByPk: jest.fn(),
    }
}));

jest.mock('../../product/models/Product', () => ({
    Product: {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
        findByPk: jest.fn(),
    }
}));

describe("Teste de criação de TransactionProduct", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test("Cria um TransactionProduct com sucesso", async () => {
        const transactionProduct: TransactionProductInterface = {
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
        } as TransactionProductInterface;
        const product: ProductInterface = {
            idProduct: "1",
            name: "Produto 1",
            description: "Descrição do produto 1",
            price: 10,
            quantity: 10,
            category: "Categoria 1",
            options: "Opções 1",
            photo: "photo",
            awsKey: "awsKey",
            idVendor: "1",
            setDataValue: jest.fn(),
        } as unknown as ProductInterface;
        const spy = jest.spyOn(ProductService, 'getById').mockImplementationOnce(() => Promise.resolve(product));
        const spy2 = jest.spyOn(TransactionProduct, 'create').mockResolvedValueOnce(transactionProduct);
        const spy3 = jest.spyOn(ProductService, 'update').mockImplementationOnce(() => Promise.resolve(null));
        const result = await TransactionProductService.create(transactionProduct);
        expect(result).toEqual(transactionProduct);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy2).toHaveBeenCalledTimes(1);
        expect(spy3).toHaveBeenCalledTimes(1);
    });
});