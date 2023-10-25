import { TransactionProductInterface } from "../../transactionProduct/models/TransactionProduct";
import { TransactionProductRepository } from "../repository/TransactionProductRepository";
import { SequelizeTransactionProductRepository } from "../../transactionProduct/adapters/SequelizeTransactionProductRepository";
class TransactionProductServiceClass{
    constructor(private transactionProductRepository: TransactionProductRepository) {}

    async create(transactionProduct: TransactionProductInterface) : Promise<TransactionProductInterface> {
        return await this.transactionProductRepository.create(transactionProduct);
    }
}

const transactionProductRepository = new SequelizeTransactionProductRepository();
export const TransactionProductService = new TransactionProductServiceClass(transactionProductRepository);