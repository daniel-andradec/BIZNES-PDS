import { AddressRepository } from "../repository/AddressRepository";
import { AddressInterface } from "../models/Address";
import { PayloadParams } from "../../users/types/PayloadParams";

export class AddressService{
    constructor(private addressRepository: AddressRepository) {}

    async create(address: AddressInterface): Promise<AddressInterface> {
        return await this.addressRepository.create(address);
    }

    async getAddress(user: PayloadParams): Promise<AddressInterface | null> {
        return await this.addressRepository.getAddress(user);
    }

    async update(address: AddressInterface, idUser: string): Promise<AddressInterface> {
        return await this.addressRepository.update(address, idUser);
    }
}