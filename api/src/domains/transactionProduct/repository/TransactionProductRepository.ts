import { TransactionProductInterface } from "../models/TransactionProduct";

export interface TransactionProductRepository {
    create(transactionProduct: TransactionProductInterface): Promise<TransactionProductInterface>;
}