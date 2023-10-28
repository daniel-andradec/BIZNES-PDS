import Joi from "joi";
import { VendorCreationAttributes } from "../../../src/domains/vendor/models/Vendor";
import { QueryError } from "../../../errors/QueryError";

export const validateRegisterVendor = (vendor: VendorCreationAttributes) => {
    const schema = Joi.object<VendorCreationAttributes>({
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(6).max(255).required(),
        CNPJ: Joi.string().min(14).max(14).required(),
        companyName: Joi.string().min(3).max(255).required(),
        fantasyName: Joi.string().min(3).max(255).required(),
        phone: Joi.string().min(3).max(255).required(),
        devolutionPolicy: Joi.string().min(3).required(),
        street: Joi.string().min(3).max(255).required(),
        number: Joi.string().required(),
        complement: Joi.string().min(0).max(255),
        neighborhood: Joi.string().min(3).max(255).required(),
        city: Joi.string().min(3).max(255).required(),
        state: Joi.string().min(2).max(255).required(),
        cep: Joi.string().min(3).max(255).required(),
    });

    const { error } = schema.validate(vendor);
    if (error) {
        throw new QueryError(error.details[0].message);
    }
    return null;
}

export const validateUpdateVendor = (vendor: VendorCreationAttributes) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255),
        email: Joi.string().min(3).max(255).email(),
        password: Joi.string().min(6).max(255),
        CNPJ: Joi.string().min(14).max(14),
        companyName: Joi.string().min(3).max(255),
        fantasyName: Joi.string().min(3).max(255),
        phone: Joi.string().min(3).max(255),
        devolutionPolicy: Joi.string().min(3).max(255),
        street: Joi.string().min(3).max(255),
        number: Joi.string(),
        complement: Joi.string().min(0).max(255),
        neighborhood: Joi.string().min(3).max(255),
        city: Joi.string().min(3).max(255),
        state: Joi.string().min(2).max(255),
        cep: Joi.string().min(3).max(255),
    });

    const { error } = schema.validate(vendor);
    if (error) {
        return error.details[0].message;
    }
    return null;
}

