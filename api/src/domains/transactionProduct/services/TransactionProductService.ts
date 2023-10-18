import { TransactionProduct } from "../models/TransactionProduct";
import { TransactionProductInterface } from "../models/TransactionProduct";


class TransactionProductServiceClass {
    async create(transactionProduct: TransactionProductInterface): Promise<TransactionProductInterface> {
        return await TransactionProduct.create(transactionProduct);
    }
}
