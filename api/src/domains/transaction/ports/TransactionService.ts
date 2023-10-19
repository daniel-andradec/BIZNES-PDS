import { TransactionRepository } from "../repository/TransactionRepository";
import { TransactionInterface } from "../models/Transaction";
import { TransactionProduct, TransactionProductInterface } from "../../transactionProduct/models/TransactionProduct";

export class TransactionService{
    constructor(private transactionRepository: TransactionRepository) {}

    async create(transaction: TransactionInterface, transactionProducts: TransactionProductInterface[]): Promise<TransactionInterface> {
        return await this.transactionRepository.create(transaction, transactionProducts);
    }

    async getAll(): Promise<TransactionInterface[]> {
        return await this.transactionRepository.getAll();
    }

    async getById(id: string): Promise<TransactionInterface | null> {
        return await this.transactionRepository.getById(id);
    }

    async delete(id: string): Promise<void> {
        return await this.transactionRepository.delete(id);
    }

    async getByUserId(id: string): Promise<TransactionInterface[]> {
        return await this.transactionRepository.getByUserId(id);
    }

}