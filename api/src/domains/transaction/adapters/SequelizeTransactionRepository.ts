import { Transaction } from "../models/Transaction";
import { TransactionInterface } from "../models/Transaction";
import { TransactionProduct } from "../../transactionProduct/models/TransactionProduct";
import { TransactionProductInterface } from "../../transactionProduct/models/TransactionProduct";
import { TransactionProductService } from "../../transactionProduct/ports/TransactionProductService";
import { TransactionRepository } from "../repository/TransactionRepository";
import { Product } from "../../product/models/Product";
import { AddressService } from "../../address/ports/AddressService";
import { AddressInterface } from "../../address/models/Address";
import { Address } from "../../address/models/Address";
import { Vendor } from "../../vendor/models/Vendor";

export class SequelizeTransactionRepository implements TransactionRepository{

    async create(transaction: TransactionInterface, transactionProducts: TransactionProductInterface[], address: AddressInterface): Promise<TransactionInterface> {
        try{
            const transactionCreated = await Transaction.create(transaction);
            for (const transactionProduct of transactionProducts) {
                const product = await Product.findByPk(transactionProduct.idProduct);
                if (!product) {
                    throw new Error('Produto não encontrado');
                }

                const vendor = await Vendor.findByPk(product.idVendor);
                if (!vendor) {
                    throw new Error('Vendedor não encontrado');
                }

                transactionProduct.vendorName = vendor.fantasyName;
                transactionProduct.idVendor = vendor.idVendor;
                transactionProduct.productPhoto = product.photo;
                transactionProduct.productName = product.name;
                transactionProduct.productCategory = product.category;
                transactionProduct.idTransaction = transactionCreated.idTransaction;
                await TransactionProductService.create(transactionProduct);
            }
            address.idTransaction = transactionCreated.idTransaction;
            await AddressService.create(address);
            return transactionCreated;
        } catch (error) {
            throw error;
        }
    }

    async getAll(): Promise<TransactionInterface[]> {
        return await Transaction.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
            include: [{
                model: TransactionProduct,
                attributes: {exclude: ['idTransaction', 'createdAt', 'updatedAt']}
            }, {
                model: Address,
                attributes: {exclude: ['idTransaction', 'createdAt', 'updatedAt']},
            }]
        });
    }

    async getById(id: string): Promise<TransactionInterface | null> {
        return await Transaction.findByPk(id, {
            attributes: {exclude: ['createdAt', 'updatedAt']},
            include: [{
                model: TransactionProduct,
                attributes: {exclude: ['idTransaction', 'createdAt', 'updatedAt']}
            }, {
                model: Address,
                attributes: {exclude: ['idTransaction', 'createdAt', 'updatedAt']},
            }]
        });
    }

    async delete(id: string): Promise<void> {
        await Transaction.destroy({where: {idTransaction: id}});
    }

    async getByUserId(id: string): Promise<TransactionInterface[]> {
        return await Transaction.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
            where: {idUser: id},
            include: [{
                model: TransactionProduct,
                attributes: {exclude: ['idTransaction', 'createdAt', 'updatedAt']}
            }, {
                model: Address,
                attributes: {exclude: ['idTransaction', 'createdAt', 'updatedAt']},
            }]
        });
    }

    async getByVendorId(id: string): Promise<TransactionInterface[]> {
        return await Transaction.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
            where:{ '$TransactionProducts.idVendor$': id},
            include: [{
                model: TransactionProduct,
                attributes: {exclude: ['idTransaction', 'createdAt', 'updatedAt']},
            }, {
                model: Address,
                attributes: {exclude: ['idTransaction', 'createdAt', 'updatedAt']},
            }]
        });
    }
}