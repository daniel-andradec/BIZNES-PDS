import { Product } from "../models/Product";
import { ProductRepository } from "../repository/ProductRepository";
import { PayloadParams } from "../../users/types/PayloadParams";
import { ProductInterface } from "../models/Product";
import { QueryError } from "../../../../errors/QueryError";
import { Vendor } from "../../vendor/models/Vendor";
import { VendorService } from "../../vendor/ports/VendorService";
import { deleteObject } from "../../../../utils/functions/aws";
import { Attributes, CreationAttributes } from 'sequelize/types';

export class SequelizeProductRepository implements ProductRepository {
    async create(body: CreationAttributes<ProductInterface>, user: PayloadParams, file: any) {
        try {
            const vendor = await Vendor.findOne({where: {idUser: user.idUser}});
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
                attributes: ['idProduct', 'name', 'description', 'price', 'quantity', 'category', 'options', 'photo'],
                include: [{
                    model: Vendor,
                    attributes: ['fantasyName', 'devolutionPolicy', 'idVendor']
                }]
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
    async update(idProduct: string, body: Attributes<ProductInterface>, file: any) {
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