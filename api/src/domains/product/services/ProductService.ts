import { Product, ProductInterface } from '../models/Product';
import { Attributes, CreationAttributes } from 'sequelize/types';
import { NotAuthorizedError } from '../../../../errors/NotAuthorizedError';
import { QueryError } from '../../../../errors/QueryError';
import { PayloadParams } from "../../users/types/PayloadParams";
import { VendorService } from '../../vendor/services/VendorService';

class ProductServiceClass {
    async create(body: CreationAttributes<ProductInterface>, user: PayloadParams) {
        try {
            const vendor = await VendorService.getById(user.idUser);
            if (!vendor) {
                throw new QueryError('Usuário não encontrado');
            }
            const newProduct = {
                name: body.name,
                description: body.description,
                price: body.price,
                quantity: body.quantity,
                idVendor: vendor.idVendor,
            };
            const product = await Product.create(newProduct);
            return product;
        } catch (error) {
            throw(error);
        }
    }
    async getAll(idVendor: string) {
        try {
            const products = await Product.findAll({
                where: {idVendor},
                attributes: ['idProduct', 'name', 'description', 'price', 'quantity'],
            });
            return products;
        } catch (error) {
            throw(error);
        }
    }
    async getById(idProduct: string) {
        try {
            const product = await Product.findByPk(idProduct, {
                attributes: ['idProduct', 'name', 'description', 'price', 'quantity'],
            });
            if (!product) {
                throw new QueryError(`Não há um produto com o ID ${idProduct}!`);
            }
            return product;
        } catch (error) {
            throw(error);
        }
    }
    async update(idProduct: string, body: Attributes<ProductInterface>, user: PayloadParams) {
        try {
            const product = await this.getById(idProduct);
            const vendor = await VendorService.getById(user.idUser);
            if (product.idVendor != vendor!.idVendor) {
                throw new NotAuthorizedError('Você não tem permissão para editar esse produto!');
            }
            await product.update(body);
        } catch (error) {
            throw(error);
        }
    }
    async delete(idProduct: string, user: PayloadParams) {
        try {
            const product = await this.getById(idProduct);
            const vendor = await VendorService.getById(user.idUser);
            if (product.idVendor != vendor!.idVendor) {
                throw new NotAuthorizedError('Você não tem permissão para deletar esse produto!');
            }
            await product.destroy();
        } catch (error) {
            throw(error);
        }
    }
}