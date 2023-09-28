import { Address, AddressInterface, AddressCreationAttributes } from "../models/Address";
import { UserService } from "../../users/services/UserService";
import { User, UserInterface } from "../../users/models/User";
import { Attributes, CreationAttributes } from 'sequelize/types';
import { userRoles } from "../../users/constants/userRoles";
import { NotAuthorizedError } from '../../../../errors/NotAuthorizedError';
import { QueryError } from '../../../../errors/QueryError';
import { PayloadParams } from "../../users/types/PayloadParams";
import { validateRegisterCustomer, validateUpdateCustomer } from "../../../../utils/functions/validation/validateCustomer";
import { deleteObject } from "../../../../utils/functions/aws";

class AddressServiceClass {
    async create(body: AddressCreationAttributes, user: PayloadParams) {
        try {
            const newAddress: CreationAttributes<AddressInterface> = {
                street: body.street,
                number: body.number,
                complement: body.complement,
                neighborhood: body.neighborhood,
                city: body.city,
                state: body.state,
                cep: body.cep,
                idUser: user.idUser,
            };
            const address = await Address.create(newAddress);
            return address;
        } catch (error) {
            throw(error);
        }
    }

    async getAddress(user: PayloadParams) {
        try {
            const addresses = await Address.findAll({
                where: {
                    idUser: user.idUser,
                },
            });
            return addresses;
        } catch (error) {
            throw(error);
        }
    }

}

export const AddressService = new AddressServiceClass();
