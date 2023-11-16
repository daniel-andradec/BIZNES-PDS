import { Product, ProductInterface,  } from "../models/Product";
import { ProductService } from "../ports/ProductService";
import { Attributes, CreationAttributes } from 'sequelize/types';
import { PayloadParams } from "../../users/types/PayloadParams";

jest.mock('../models/Product', () => ({
    Product: {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
        findByPk: jest.fn(),
    }
}));

describe("Teste de criação de produto", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test("Cria um produto com sucesso", async () => {
        const product: CreationAttributes<ProductInterface>= {
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
        };
        const user : PayloadParams = {
            idUser: "1",
            email: "email",
            name: "name",
            role: "role",
        };
        const file = { location: "location", key: "key" };
        const spy = jest.spyOn(Product, 'create').mockResolvedValueOnce(product);
        const result = await ProductService.create(product, user, file);
        expect(result).toEqual(product);
        expect(spy).toHaveBeenCalledTimes(1);
    });
});

describe("Teste de busca de produtos", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test("Busca todos os produtos de uma loja", async () => {
        const products: ProductInterface[] = [
            {
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
            } as ProductInterface,
            {
                idProduct: "2",
                name: "Produto 2",
                description: "Descrição do produto 2",
                price: 20,
                quantity: 20,
                category: "Categoria 2",
                options: "Opções 2",
                photo: "photo",
                awsKey: "awsKey",
                idVendor: "2",
            } as ProductInterface,
        ];
        const spy = jest.spyOn(Product, 'findAll').mockResolvedValueOnce(products);
        const result = await ProductService.getAllByStore("1");
        expect(result).toEqual(products);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    test("Busca todos os produtos", async () => {
        const products: ProductInterface[] = [
            {
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
            } as ProductInterface,
            {
                idProduct: "2",
                name: "Produto 2",
                description: "Descrição do produto 2",
                price: 20,
                quantity: 20,
                category: "Categoria 2",
                options: "Opções 2",
                photo: "photo",
                awsKey: "awsKey",
                idVendor: "2",
            } as ProductInterface,
        ];
        const spy = jest.spyOn(Product, 'findAll').mockResolvedValueOnce(products);
        const result = await ProductService.getAll();
        expect(result).toEqual(products);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    test("Busca um produto por ID", async () => {
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
        } as ProductInterface;
        const spy = jest.spyOn(Product, 'findByPk').mockResolvedValueOnce(product);
        const result = await ProductService.getById("1");
        expect(result).toEqual(product);
        expect(spy).toHaveBeenCalledTimes(1);
    });
});

describe("Teste de edição de produtos", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test("Edita um produto com sucesso", async () => {
        const product = {
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
            update: jest.fn().mockResolvedValue(undefined)
        } as unknown as ProductInterface;;
        const body: Attributes<ProductInterface> = {
            name: "Produto 1",
            description: "Descrição do produto 1",
            price: 10,
            quantity: 10,
            category: "Categoria 1",
            options: "Opções 1",
            photo: "photo",
            awsKey: "awsKey",
            idVendor: "1",
        } as Attributes<ProductInterface>;
        const file = { location: "location", key: "key" };
        const spy = jest.spyOn(Product, 'findByPk').mockResolvedValueOnce(product);
        const spy2 = jest.spyOn(product, 'update');
        await ProductService.update("1", body, file);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy2).toHaveBeenCalledTimes(1)
    });
});

describe("Teste de deleção de produtos", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test("Deleta um produto com sucesso", async () => {
        const product = {
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
            destroy: jest.fn().mockResolvedValue(undefined)
        } as unknown as ProductInterface;
        const user : PayloadParams = {
            idUser: "1",
            email: "email",
            name: "name",
            role: "role",
        } as PayloadParams;
        const spy = jest.spyOn(Product, 'findByPk').mockResolvedValueOnce(product);
        const spy2 = jest.spyOn(product, 'destroy');
        await ProductService.delete("1", user);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy2).toHaveBeenCalledTimes(1);
    });
});


