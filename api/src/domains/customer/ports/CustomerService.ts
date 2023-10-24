import { CustomerRepository } from "../repository/CustomerRepository";
import { CustomerInterface } from "../models/Customer";
import { AddressInterface } from "../../address/models/Address";
import { UserInterface } from "../../users/models/User";
import { CreationAttributes } from "sequelize";
import { PayloadParams } from "../../users/types/PayloadParams";

export class CustomerService{
    constructor(private customerRepository: CustomerRepository) {}
    async create(body: CreationAttributes<CustomerInterface>) : Promise<CustomerInterface>{
        return await this.customerRepository.create(body);
    }
    async getAll() : Promise<CustomerInterface[]>{
        return await this.customerRepository.getAll();
    }
    async getLogged(id: string) : Promise<{customer: CustomerInterface | null, address: AddressInterface | null, user: UserInterface | null}>{
        return await this.customerRepository.getLogged(id);
    }
    async getById(id: string) : Promise<CustomerInterface>{
        return await this.customerRepository.getById(id);
    }
    async update(body: CreationAttributes<CustomerInterface>, id: string) : Promise<void>{
        return await this.customerRepository.update(body, id);
    }
    async delete(id: string, loggedUser: PayloadParams): Promise<void>{
        return await this.customerRepository.delete(id, loggedUser);
    }
}