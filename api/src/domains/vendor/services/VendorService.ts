import { Vendor, VendorInterface, VendorCreationAttributes } from "../models/Vendor";
import { UserService } from "../../users/services/UserService";
import { User, UserInterface } from "../../users/models/User";
import { Attributes, CreationAttributes } from 'sequelize/types';
import { userRoles } from "../../users/constants/userRoles";
import { NotAuthorizedError } from '../../../../errors/NotAuthorizedError';
import { QueryError } from '../../../../errors/QueryError';
import { PayloadParams } from "../../users/types/PayloadParams";
import { validateRegisterVendor, validateUpdateVendor } from "../../../../utils/functions/validation/validateVendor";


class VendorServiceClass {
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
            await UserService.delete(vendor.idUser, loggedUser.idUser);
        } catch (error) {
            throw(error);
        }
    } 
}

export const VendorService = new VendorServiceClass();