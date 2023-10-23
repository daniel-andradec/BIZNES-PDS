import { Customer, CustomerInterface, CustomerCreationAttributes } from "../models/Customer";
import { UserService } from "../../users/ports/UserService";
import { User, UserInterface } from "../../users/models/User";
import { Attributes, CreationAttributes } from 'sequelize/types';
import { userRoles } from "../../users/constants/userRoles";
import { NotAuthorizedError } from '../../../../errors/NotAuthorizedError';
import { QueryError } from '../../../../errors/QueryError';
import { PayloadParams } from "../../users/types/PayloadParams";
import { validateRegisterCustomer, validateUpdateCustomer } from "../../../../utils/functions/validation/validateCustomer";
import { deleteObject } from "../../../../utils/functions/aws";
import { AddressService } from "../../address/ports/AddressService";
import { CustomerRepository } from "../repository/CustomerRepository";
import { Address, AddressInterface } from "../../address/models/Address";

export class SequelizeCustomerRepository implements CustomerRepository{
    async create(body: CustomerCreationAttributes): Promise<CustomerInterface> {
        try {
            //validateRegisterCustomer(body);
            console.log(body);
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
                idUser: user.idUser,
            };
            const address = {
                street: body.street,
                number: body.number,
                complement: body.complement,
                neighborhood: body.neighborhood,
                city: body.city,
                state: body.state,
                cep: body.cep,
                idUser: user.idUser,
            }
            await AddressService.create(address);
            const customer = await Customer.create(newCustomer);
            return customer;
        } catch (error) {
            throw(error);
        }
    }

    async getAll() : Promise<CustomerInterface[]> {
        try {
            const customers = await Customer.findAll({
                attributes: ['idCustomer', 'phone', 'CPF', 'birthDate'],
                include: [{
                    model: User,
                    attributes: ['name', 'email'],
                    include: [{
                        model: Address,
                        attributes: ['city', 'state']
                    }]
                }],
            });
            return customers;
        } catch (error) {
            throw(error);
        }
    }

    async getLogged(idUser: string) : Promise<{customer: CustomerInterface | null, address: AddressInterface | null, user: UserInterface | null}> {
        try{
            const customer = await Customer.findOne({where: {idUser}});
            const user = await UserService.getById(idUser);
            const address = await AddressService.getAddress(idUser);
            const costumerWithAddress = { customer, address, user};
            return costumerWithAddress;
        }
        catch(error){
            throw(error);
        }
    }

    async getById(id: string) : Promise<CustomerInterface> {
        try {
            const customer = await Customer.findByPk(id, {
                attributes: ['idCustomer', 'idUser', 'phone', 'CPF', 'birthDate'],
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

    async update(body: CustomerCreationAttributes, idUser: string ) : Promise<void> {
        try {
            validateUpdateCustomer(body);
           
            const user = await UserService.getById(idUser);

            if(!user){
                throw new QueryError(`Não há usuário com o ID ${idUser}!`);
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
                role: userRoles.customer,
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
            }

            await UserService.update(user.idUser, newUser);
            await Customer.update(newCustomer, {where: {idUser: idUser}});
            await AddressService.update(newAddress, user.idUser);

        } catch (error) {
            throw(error);
        }
    }

    async delete(id: string, loggedUser: PayloadParams) : Promise<void> {
        try{
            const customer = await this.getById(id);

            if(!customer){
                throw new QueryError(`Não há customer com o ID ${id}!`);
            }


            if(loggedUser.role != userRoles.admin && loggedUser.idUser != id){
                throw new NotAuthorizedError('Você não tem permissão para deletar outro usuário!');
            }

            await UserService.delete(customer.idUser);
        } catch (error) {
            throw(error);
        }
    }
}

