import { Vendor, VendorInterface, VendorCreationAttributes } from "../models/Vendor";
import { UserService } from "../../users/services/UserService";
import { AddressService } from "../../address/services/AddressService";
import { User, UserInterface } from "../../users/models/User";
import { Address, AddressInterface } from "../../address/models/Address";
import { Attributes, CreationAttributes } from 'sequelize/types';
import { userRoles } from "../../users/constants/userRoles";
import { NotAuthorizedError } from '../../../../errors/NotAuthorizedError';
import { QueryError } from '../../../../errors/QueryError';
import { PayloadParams } from "../../users/types/PayloadParams";
import { validateRegisterVendor, validateUpdateVendor } from "../../../../utils/functions/validation/validateVendor";

class VendorServiceClass {
    async create(body: VendorCreationAttributes) { 
        try {
            //validateRegisterVendor(body);
            console.log(body);
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
            const address = await AddressService.create(newAddress, user);

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
            const vendor = await Vendor.findByPk(id);
            if (!vendor) {
                throw new QueryError(`Não há loja com o ID ${id}!`);
            }
            return vendor;
        } catch (error) {
            throw(error);
        }
    }

    async update(id: string, body: VendorCreationAttributes, loggedUser: PayloadParams){
        try {
            validateUpdateVendor(body);
            const vendor = await this.getById(id);;
            const user = await UserService.getById(vendor.idUser);

            if (loggedUser.role != userRoles.admin && loggedUser.idUser != user.idUser) {
                throw new NotAuthorizedError('Você não tem permissão para editar outro usuário!');
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

            await UserService.update(user.idUser, newUser, loggedUser);
            await vendor.update(body);
            await AddressService.update(newAddress, user);

            return vendor;

        } catch (error) {
            throw(error);
        }
    }

    async delete(id: string, loggedUser: PayloadParams) {  
        try {
            const vendor = await this.getById(id);
            if (loggedUser.role != userRoles.admin && loggedUser.idUser != id) {
                throw new NotAuthorizedError('Você não tem permissão para deletar outro usuário!');
            }

            await UserService.delete(vendor.idUser, loggedUser.idUser);
        } catch (error) {
            throw(error);
        }
    } 
}

export const VendorService = new VendorServiceClass();