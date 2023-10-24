import { CustomerInterface } from "../models/Customer";
import { CreationAttributes } from "sequelize/types";
import { AddressInterface } from "../../address/models/Address";
import { UserInterface } from "../../users/models/User";
import { PayloadParams } from "../../users/types/PayloadParams";

export interface CustomerRepository {
    create(body: CreationAttributes<CustomerInterface>) : Promise<CustomerInterface>;
    getAll() : Promise<CustomerInterface[]>;
    getLogged(id: string) : Promise<{customer: CustomerInterface | null, address: AddressInterface | null, user: UserInterface | null}>
    getById(id: string) : Promise<CustomerInterface>;
    update(body: CreationAttributes<CustomerInterface>, id: string) : Promise<void>;
    delete(id: string, loggedUser: PayloadParams): Promise<void>;
}