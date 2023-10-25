import { VendorInterface, VendorCreationAttributes } from "../models/Vendor";
import { AddressInterface } from "../../address/models/Address";
import { UserInterface } from "../../users/models/User";

export interface vendorRepository {
    create(vendor: VendorCreationAttributes): Promise<VendorInterface>;
    getAll(): Promise<VendorInterface[]>;
    getById(idVendor: string): Promise<VendorInterface | null>;
    getLogged(idUser: string): Promise<{
        vendor: VendorInterface | null;
        address: AddressInterface | null;
        user: UserInterface | null;
    }>;
    update(id: string, vendor:  VendorCreationAttributes): Promise<VendorInterface>;
    delete(id: string): Promise<void>;
}