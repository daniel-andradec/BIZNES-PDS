import { Vendor, VendorInterface, VendorCreationAttributes } from "../models/Vendor";
import { UserService } from "../../users/services/UserService";
import { User, UserInterface } from "../../users/models/User";
import { Attributes, CreationAttributes } from 'sequelize/types';



class VendorServiceClass {
    async create(body: VendorCreationAttributes) {
        try {
            const newVendor  = {
                CNPJ: body.CNPJ,
                companyName: body.companyName,
                fantasyName: body.fantasyName,
                phone: body.phone,
                devolutionPolicy: body.devolutionPolicy,
                idUser: '',
            };
            const newUser: CreationAttributes<UserInterface> = {
                name: body.name,
                email: body.email,
                password: body.password,
                role: body.role,
            };
            const user = await UserService.create(newUser);
            newVendor.idUser = user.idUser;
            const vendor = await Vendor.create(newVendor);
            return vendor;
        } catch (error) {
            throw(error);
        }
    }

    async getAll() {
        try {
            const vendors = await Vendor.findAll({
                attributes: ['idVendor', 'CNPJ', 'companyName', 'fantasyName', 'phone', 'devolutionPolicy'],
                include: [{
                    model: User,
                    attributes: ['name', 'email'],
                }],
            });
            return vendors;
        } catch (error) {
            throw(error);
        }
    }

    async getById(id: string) {
        try {
            const vendor = await Vendor.findByPk(id, {
                attributes: ['idVendor', 'CNPJ', 'companyName', 'fantasyName', 'phone', 'devolutionPolicy'],
                include: [{
                    model: User,
                    attributes: ['name', 'email'],
                }],
            });
            return vendor;
        } catch (error) {
            throw(error);
        }
    }

}