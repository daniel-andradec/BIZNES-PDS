import { CreationAttributes } from "sequelize";
import { AddressInterface } from "../models/Address";
import { PayloadParams } from "../../users/types/PayloadParams";


export interface AddressRepository {
    create(address: CreationAttributes<AddressInterface>): Promise<AddressInterface>;
    getAddress(id: string): Promise<AddressInterface | null>;
    update(address: CreationAttributes<AddressInterface>, idUser: string): Promise<AddressInterface>;
}

