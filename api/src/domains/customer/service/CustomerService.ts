import { hash } from 'bcrypt';
import { Customer, CustomerInterface } from '../models/Customer';
import { Attributes } from 'sequelize/types';
import { QueryError } from '../../../../errors/QueryError';

class CustomerServiceClass {
    async encryptPassword(password: string) {
        const saltRounds = 10;
        const encryptedPassword = await hash(password, saltRounds);
        return encryptedPassword;
    }

    async create(body: Attributes<CustomerInterface>) {
        const customer = await Customer.findOne({where: {email: body.email}});
    
        if (customer) {
            throw new QueryError('E-mail já cadastrado!');
        }

        const newCustomer = {
            CPF: body.CPF,
            birthDate: body.birthDate,
            phone: body.phone,
            email: body.email,
            password: body.password,
    };

        newCustomer.password = await this.encryptPassword(newCustomer.password);

    await Customer.create(newCustomer);
    
    }
}

export const CustomerService = new CustomerServiceClass();