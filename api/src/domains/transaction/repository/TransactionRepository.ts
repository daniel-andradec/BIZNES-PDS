import { TransactionInterface } from "../models/Transaction";
import { TransactionProductInterface } from "../../transactionProduct/models/TransactionProduct";
import { AddressInterface } from "../../address/models/Address";

export interface TransactionRepository {
    create(transaction: TransactionInterface, transactionProducts: TransactionProductInterface[], address: AddressInterface): Promise<TransactionInterface>;
    getAll(): Promise<TransactionInterface[]>;
    getById(id: string): Promise<TransactionInterface | null>;
    delete(id: string): Promise<void>;
    getByUserId(id: string): Promise<TransactionInterface[]>;
    getByVendorId(id: string): Promise<TransactionInterface[]>;
}