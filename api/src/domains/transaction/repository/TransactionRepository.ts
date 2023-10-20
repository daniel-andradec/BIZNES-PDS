import { TransactionInterface } from "../models/Transaction";
import { TransactionProductInterface } from "../../transactionProduct/models/TransactionProduct";

export interface TransactionRepository {
    create(transaction: TransactionInterface, transactionProducts: TransactionProductInterface[]): Promise<TransactionInterface>;
    getAll(): Promise<TransactionInterface[]>;
    getById(id: string): Promise<TransactionInterface | null>;
    delete(id: string): Promise<void>;
    getByUserId(id: string): Promise<TransactionInterface[]>;
}