import { Product, ProductInterface } from '../models/Product';
import { Attributes, CreationAttributes } from 'sequelize/types';
import { NotAuthorizedError } from '../../../../errors/NotAuthorizedError';
import { QueryError } from '../../../../errors/QueryError';
import { PayloadParams } from "../../users/types/PayloadParams";
import { VendorService } from '../../vendor/services/VendorService';
import { deleteObject } from '../../../../utils/functions/aws';
const { Op } = require("sequelize");

class ProductServiceClass {
    async create(body: CreationAttributes<ProductInterface>, user: PayloadParams, file: any) {
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
                options: body.options,
                photo: (file as Express.MulterS3.File).location,
                category: body.category,
                awsKey: (file as Express.MulterS3.File).key,
                idVendor: vendor.idVendor,
            };
            const product = await Product.create(newProduct);
            return product;
        } catch (error) {
            throw(error);
        }
    }
    async getAllByStore(idUser: string) {
        try {
            const idVendor = (await VendorService.getById(idUser))!.idVendor;
            const products = await Product.findAll({
                where: {idVendor},
                attributes: ['idProduct', 'name', 'description', 'price', 'quantity', 'category', 'options', 'photo'],
            });
            return products;
        } catch (error) {
            throw(error);
        }
    }
    async getAll() {
        try {
            const products = await Product.findAll({
                where: {quantity: {[Op.gt]: 0}}, // gt = greater than 0
                attributes: ['idProduct', 'name', 'description', 'price', 'quantity', 'category', 'options', 'photo']
            });
            return products;
        } catch (error) {
            throw(error);
        }
    }
    async getById(idProduct: string) {
        try {
            const product = await Product.findByPk(idProduct, {
                attributes: ['idProduct', 'name', 'description', 'price', 'quantity', 'awsKey'],
            });
            if (!product) {
                throw new QueryError(`Não há um produto com o ID ${idProduct}!`);
            }
            return product;
        } catch (error) {
            throw(error);
        }
    }
    async update(idProduct: string, body: Attributes<ProductInterface>, user: PayloadParams, file: any) {
        try {
            const product = await this.getById(idProduct);
            if(file){
                body.photo = (file as Express.MulterS3.File).location;
                body.awsKey = (file as Express.MulterS3.File).key;
            }
            else{
                body.photo = product.photo;
                body.awsKey = product.awsKey;
            }
            
            const vendor = await VendorService.getById(user.idUser);
            await product.update(body);
        } catch (error) {
            throw(error);
        }
    }
    async delete(idProduct: string, user: PayloadParams) {
        try {
            const product = await this.getById(idProduct);
            const vendor = await VendorService.getById(user.idUser);
            await deleteObject(product.awsKey);
            await product.destroy();
        } catch (error) {
            throw(error);
        }
    }
}

export const ProductService = new ProductServiceClass();