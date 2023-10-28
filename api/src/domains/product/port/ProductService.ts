import { ProductRepository } from "../repository/ProductRepository";
import { ProductInterface } from "../models/Product";
import { PayloadParams } from "../../users/types/PayloadParams";
import { CreationAttributes } from "sequelize";
import { Attributes } from "sequelize/types";
import { SequelizeProductRepository } from "../adapters/SequelizeProductRepository";

class ProductServiceClass{
    constructor(private productRepository: ProductRepository) {}

    async create(product: CreationAttributes<ProductInterface>, user: PayloadParams, file: any): Promise<ProductInterface> {
        return await this.productRepository.create(product, user, file);
    }

    async getAllByStore(idUser: string): Promise<ProductInterface[]> {
        return await this.productRepository.getAllByStore(idUser);
    }

    async getAll(): Promise<ProductInterface[]> {
        return await this.productRepository.getAll();
    }

    async getById(idProduct: string): Promise<ProductInterface | null> {
        return await this.productRepository.getById(idProduct);
    }

    async update(idProduct: string, body: Attributes<ProductInterface>, file: any): Promise<null | void> {
        return await this.productRepository.update(idProduct, body, file);
    }

    async delete(idProduct: string, user: PayloadParams): Promise<void> {
        return await this.productRepository.delete(idProduct, user);
    }
}

const productRepository = new SequelizeProductRepository();
export const ProductService = new ProductServiceClass(productRepository);