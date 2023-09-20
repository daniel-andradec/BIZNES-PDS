import Joi from "joi";
import { CustomerCreationAttributes } from "../../../src/domains/customer/models/Customer";
import { QueryError } from "../../../errors/QueryError";

export const validateRegisterCustomer = (customer: CustomerCreationAttributes) => {
    const schema = Joi.object<CustomerCreationAttributes>({
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(6).max(255).required(),
        phone: Joi.string().min(3).max(255).required(),
        CPF: Joi.string().min(11).max(11).required(),
        birthDate: Joi.string().min(3).max(255).required(),
    });

    const { error } = schema.validate(customer);
    if (error) {
        throw new QueryError(error.details[0].message);
    }
    return null;
}

export const validateUpdateCustomer = (customer: CustomerCreationAttributes) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255),
        email: Joi.string().min(3).max(255).email(),
        password: Joi.string().min(6).max(255),
        phone: Joi.string().min(3).max(255),
        CPF: Joi.string().min(11).max(11),
        birthDate: Joi.string().min(3).max(255),
    });

    const { error } = schema.validate(customer);
    if (error) {
        return error.details[0].message;
    }
    return null;
}

