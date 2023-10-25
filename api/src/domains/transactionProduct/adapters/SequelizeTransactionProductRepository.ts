import { TransactionProduct } from "../models/TransactionProduct";
import { TransactionProductInterface } from "../models/TransactionProduct";
import { ProductService } from "../../product/services/ProductService";
import { QueryError } from "../../../../errors/QueryError";
import {TransactionProductRepository} from "../repository/TransactionProductRepository";

export class SequelizeTransactionProductRepository implements TransactionProductRepository {
    async create(transactionProduct: TransactionProductInterface): Promise<TransactionProductInterface> {
        try{
            const product = await ProductService.getById(transactionProduct.idProduct);
            console.log(product);
            if (!product) {
                throw new QueryError(`Produto de id: ${transactionProduct.idProduct} não encontrado`);
            }
            return await TransactionProduct.create(transactionProduct);
        }
        catch(error){
            throw error;
        }
    }
}
