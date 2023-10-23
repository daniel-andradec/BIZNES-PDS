import {Vendor, VendorCreationAttributes, VendorInterface} from "../models/Vendor";
import {vendorRepository} from "../repository/VendorRepository";
import { validateRegisterVendor, validateUpdateVendor } from "../../../../utils/functions/validation/validateVendor";
import { CreationAttributes } from "sequelize";
import { UserInterface } from "../../users/models/User";
import { userRoles } from "../../users/constants/userRoles";
import { AddressInterface } from "../../address/models/Address";
import { SequelizeAddressRepository } from "../../address/adapters/SequelizeAddressRepository";
import { UserService } from "../../users/ports/UserService";
import { SequelizeUserRepository } from "../../users/adapters/SequelizeUserRepository";
import { User } from "../../users/models/User";
import { QueryError } from "../../../../errors/QueryError";
import { AddressService } from "../../address/ports/AddressService";


export class SequelizeVendorRepository implements vendorRepository{
    async create(body: VendorCreationAttributes) { 
        try {
            validateRegisterVendor(body);
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
                role: userRoles.vendor,
            };
            
            const newAddress: CreationAttributes<AddressInterface> = {
                street: body.street,
                number: body.number,
                complement: body.complement,
                neighborhood: body.neighborhood,
                city: body.city,
                state: body.state,
                cep: body.cep,
                idUser: '',
            };

            const user = await UserService.create(newUser);
            
            newVendor.idUser = user.idUser;
            const vendor = await Vendor.create(newVendor);

            newAddress.idUser = user.idUser;
            const address = await AddressService.create(newAddress);

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
                    include: [{
                        model: Address,
                        attributes: ['city', 'state']
                    }]
                }],
            });
            return vendors;
        } catch (error) {
            throw(error);
        }
    }

    async getById(id: string) {
        try {
            const user = await User.findByPk(id);
            const vendor = await Vendor.findByPk(id, {
                attributes: ['idVendor', 'idUser', 'CNPJ', 'companyName', 'fantasyName', 'phone', 'devolutionPolicy']
            });
            if (!vendor) {
                throw new QueryError(`Não há loja com o ID ${id}!`);
            }
            return vendor;
        } catch (error) {
            throw(error);
        }
    }

    async getLogged(idUser: string) {
        try{
            const vendor = await Vendor.findOne({where: {idUser}});
            const user = await UserService.getById(idUser);
            const address = await AddressService.getAddress(idUser);
            const vendorWithAddress = { vendor, address, user };
            return vendorWithAddress;
        }
        catch(error){
            throw(error);
        }
    }

    async update(id: string, body: VendorCreationAttributes){
        try {
            validateUpdateVendor(body);
            const vendor = await this.getById(id);;
            const user = await UserService.getById(vendor.idUser);

            if(!user){
                throw new QueryError(`Não há usuário com o ID ${id}!`);
            }

            const newVendor = {
                CNPJ: body.CNPJ,
                companyName: body.companyName,
                fantasyName: body.fantasyName,
                phone: body.phone,
                devolutionPolicy: body.devolutionPolicy,
            };

            const newUser = {
                name: body.name,
                email: body.email,
                password: body.password,
                role: userRoles.vendor,
            };

            const newAddress = {
                street: body.street,
                number: body.number,
                complement: body.complement,
                neighborhood: body.neighborhood,
                city: body.city,
                state: body.state,
                cep: body.cep,
                idUser: user.idUser,
            };

            await UserService.update(user.idUser, newUser);
            await Vendor.update(newVendor, { where: { idUser: id } });
            await AddressService.update(newAddress, user.idUser);

            return vendor;

        } catch (error) {
            throw(error);
        }
    }

    async delete(id: string) {  
        try {
            const vendor = await this.getById(id);
            await UserService.delete(vendor.idUser);
        } catch (error) {
            throw(error);
        }
    }
}