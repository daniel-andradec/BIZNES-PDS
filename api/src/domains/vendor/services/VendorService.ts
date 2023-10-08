import { Vendor, VendorInterface, VendorCreationAttributes } from "../models/Vendor";
import { UserService } from "../../users/services/UserService";
import { User, UserInterface } from "../../users/models/User";
import { Address, AddressInterface } from "../../address/models/Address";
import { Attributes, CreationAttributes } from 'sequelize/types';
import { userRoles } from "../../users/constants/userRoles";
import { NotAuthorizedError } from '../../../../errors/NotAuthorizedError';
import { QueryError } from '../../../../errors/QueryError';
import { PayloadParams } from "../../users/types/PayloadParams";
import { validateRegisterVendor, validateUpdateVendor } from "../../../../utils/functions/validation/validateVendor";
import { deleteObject } from "../../../../utils/functions/aws";

class VendorServiceClass {
    async create(body: VendorCreationAttributes, file: any) { 
        try {
            validateRegisterVendor(body);  
            const newVendor  = {
                CNPJ: body.CNPJ,
                companyName: body.companyName,
                fantasyName: body.fantasyName,
                phone: body.phone,
                devolutionPolicy: body.devolutionPolicy,
                photo: (file as Express.MulterS3.File).location,
                awsKey: (file as Express.MulterS3.File).key,    
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
            const address = await Address.create(newAddress);

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
            const vendor = await this.getById(id);
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
            await UserService.update(user.idUser, newUser, loggedUser);
            await vendor.update(body);
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
            await deleteObject(vendor.awsKey);
            await UserService.delete(vendor.idUser, loggedUser.idUser);
        } catch (error) {
            throw(error);
        }
    } 
}

export const VendorService = new VendorServiceClass();