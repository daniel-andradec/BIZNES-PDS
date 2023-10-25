import { vendorRepository } from "../repository/VendorRepository";
import { VendorInterface, VendorCreationAttributes } from "../models/Vendor";
import { UserInterface } from "../../users/models/User";
import { AddressInterface } from "../../address/models/Address";
import { SequelizeVendorRepository } from "../adapters/SequelizeVendorRepository";
class VendorServiceClass{
    constructor(private vendorRepository: vendorRepository) {}

    async create(vendor: VendorCreationAttributes): Promise<VendorInterface> {
        return await this.vendorRepository.create(vendor);
    }

    async getAll(): Promise<VendorInterface[]> {
        return await this.vendorRepository.getAll();
    }

    async getById(id: string): Promise<VendorInterface | null> {
        return await this.vendorRepository.getById(id);
    }

    async getLogged(idUser: string): Promise<{
        vendor: VendorInterface | null;
        address: AddressInterface | null;
        user: UserInterface | null;
    }> {
        return await this.vendorRepository.getLogged(idUser);
    }

    async update(id: string, vendorToUpdate: VendorCreationAttributes): Promise<VendorInterface> {
        return await this.vendorRepository.update(id, vendorToUpdate);
    }

    async delete(id: string): Promise<void> {
        return await this.vendorRepository.delete(id);
    }
}

const vendorRepository = new SequelizeVendorRepository();
export const VendorService = new VendorServiceClass(vendorRepository);