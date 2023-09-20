import { Customer, CustomerInterface, CustomerCreationAttributes } from "../models/Customer";
import { UserService } from "../../users/services/UserService";
import { User, UserInterface } from "../../users/models/User";
import { Attributes, CreationAttributes } from 'sequelize/types';
import { userRoles } from "../../users/constants/userRoles";
import { NotAuthorizedError } from '../../../../errors/NotAuthorizedError';
import { QueryError } from '../../../../errors/QueryError';
import { PayloadParams } from "../../users/types/PayloadParams";
import { validateRegisterCustomer, validateUpdateCustomer } from "../../../../utils/functions/validation/validateCustomer";
import { deleteObject } from "../../../../utils/functions/aws";

class CustomerServiceClass {
    async create(body: CustomerCreationAttributes, file: any) {
        try {
            validateRegisterCustomer(body);
            const newUser: CreationAttributes<UserInterface> = {
                name: body.name,
                email: body.email,
                password: body.password,
                role: userRoles.customer,
            };
            const user = await UserService.create(newUser);
            const newCustomer = {
                phone: body.phone,
                CPF: body.CPF,
                birthDate: body.birthDate,
                photo: (file as Express.MulterS3.File).location,
                awsKey: (file as Express.MulterS3.File).key,
                idUser: user.idUser,
            };
            const customer = await Customer.create(newCustomer);
            return customer;
        } catch (error) {
            throw(error);
        }
    }

    async getAll() {
        try {
            const customers = await Customer.findAll({
                attributes: ['idCustomer', 'phone', 'CPF', 'birthDate'],
                include: [{
                    model: User,
                    attributes: ['name', 'email'],
                }],
            });
            return customers;
        } catch (error) {
            throw(error);
        }
    }

    async getById(id: string) {
        try {
            const customer = await Customer.findByPk(id, {
                attributes: ['idCustomer', 'phone', 'CPF', 'birthDate'],
                include: [{
                    model: User,
                    attributes: ['name', 'email'],
                }],
            });
            if (!customer) {
                throw new QueryError(`Não há loja com o ID ${id}!`);
            }
            return customer;
        } catch (error) {
            throw(error);
        }
    }

    async update(id: string, body: CustomerCreationAttributes, loggedUser: PayloadParams) {
        try {
            validateUpdateCustomer(body);
            const vendor = await this.getById(id);
            const user = await UserService.getById(vendor.idCustomer);
            if (loggedUser.role != userRoles.admin && loggedUser.idUser != user.idUser) {
                throw new NotAuthorizedError('Você não tem permissão para editar outro usuário!');
            }

            const newCustomer = {
                phone: body.phone,
                CPF: body.CPF,
                birthDate: body.birthDate,
            }

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
        try{
            const customer = await this.getById(id);

            if(loggedUser.role != userRoles.admin && loggedUser.idUser != id){
                throw new NotAuthorizedError('Você não tem permissão para deletar outro usuário!');
            }

            await deleteObject(customer.awsKey);
            await UserService.delete(customer.idUser, loggedUser.idUser);
        } catch (error) {
            throw(error);
        }
    }
}

export const CustomerService = new CustomerServiceClass();
