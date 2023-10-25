import { TransactionRepository } from "../repository/TransactionRepository";
import { TransactionInterface } from "../models/Transaction";
import { TransactionProduct, TransactionProductInterface } from "../../transactionProduct/models/TransactionProduct";
import { AddressInterface } from "../../address/models/Address";
import { SequelizeTransactionRepository } from "../adapters/SequelizeTransactionRepository";
class TransactionServiceClass {
    constructor(private transactionRepository: TransactionRepository) {}

    async create(transaction: TransactionInterface, transactionProducts: TransactionProductInterface[], address: AddressInterface): Promise<TransactionInterface> {
        return await this.transactionRepository.create(transaction, transactionProducts, address);
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

    async getByVendorId(id: string): Promise<TransactionInterface[]> {
        return await this.transactionRepository.getByVendorId(id);
    }
}

const transactionRepository = new SequelizeTransactionRepository();
export const TransactionService = new TransactionServiceClass(transactionRepository);