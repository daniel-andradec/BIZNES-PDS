import { Vendor, VendorInterface, VendorCreationAttributes } from "../models/Vendor";
import { UserService } from "../../users/services/UserService";
import { User, UserInterface } from "../../users/models/User";
import { Attributes, CreationAttributes } from 'sequelize/types';
import { userRoles } from "../../users/constants/userRoles";
import { NotAuthorizedError } from '../../../../errors/NotAuthorizedError';
import { QueryError } from '../../../../errors/QueryError';



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

    async update(id: string, body: VendorCreationAttributes, loggedUser: UserInterface){
        try {
            const vendor = await this.getById(id);
            if (!vendor) {
                throw new QueryError(`Não há um usuário com o ID ${id}!`);
            }
            if (loggedUser.role != userRoles.admin && loggedUser.idUser != id) {
                throw new NotAuthorizedError('Você não tem permissão para editar outro usuário!');
            }
            if (body.role && loggedUser.role != userRoles.admin && loggedUser.role != body.role) {
                throw new NotAuthorizedError('Você não tem permissão para editar seu cargo!');
            }
            const user = await UserService.getById(vendor.idUser);
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
                role: body.role,
            };
            await UserService.update(user.idUser, newUser, loggedUser);
            await vendor.update(body);
        } catch (error) {
            throw(error);
        }
    }

    async delete(id: string, loggedUser: UserInterface) {  
        try {
            const vendor = await this.getById(id);
            if (!vendor) {
                throw new QueryError(`Não há um usuário com o ID ${id}!`);
            }
            if (loggedUser.role != userRoles.admin && loggedUser.idUser != id) {
                throw new NotAuthorizedError('Você não tem permissão para deletar outro usuário!');
            }
            await UserService.delete(vendor.idUser, loggedUser.idUser);
        } catch (error) {
            throw(error);
        }
    } 
}