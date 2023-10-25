import { AddressRepository } from "../repository/AddressRepository";
import { AddressInterface } from "../models/Address";
import { PayloadParams } from "../../users/types/PayloadParams";
import { CreationAttributes } from "sequelize";
import {SequelizeAddressRepository} from "../adapters/SequelizeAddressRepository";

class AddressServiceClass{
    constructor(private addressRepository: AddressRepository) {}

    async create(address: CreationAttributes<AddressInterface>): Promise<AddressInterface> {
        return await this.addressRepository.create(address);
    }

    async getAddress(id: string): Promise<AddressInterface | null> {
        return await this.addressRepository.getAddress(id);
    }

    async update(address: CreationAttributes<AddressInterface>, idUser: string): Promise<AddressInterface> {
        return await this.addressRepository.update(address, idUser);
    }
}

const addressRepository = new SequelizeAddressRepository();
export const AddressService = new AddressServiceClass(addressRepository);