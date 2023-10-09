import { Address, AddressInterface} from "../models/Address";
import { Attributes, CreationAttributes } from 'sequelize/types';
import { PayloadParams } from "../../users/types/PayloadParams";

class AddressServiceClass {
    async create(body: CreationAttributes<AddressInterface>, user: PayloadParams) {
        try {
            const newAddress: CreationAttributes<AddressInterface> = {
                street: body.street,
                number: body.number,
                complement: body.complement,
                neighborhood: body.neighborhood,
                city: body.city,
                state: body.state,
                cep: body.cep,
                idUser: body.idUser,
            };
            const address = await Address.create(newAddress);
            return address;
        } catch (error) {
            throw(error);
        }
    }

    async getAddress(user: PayloadParams) {
        try {
            const address = await Address.findOne({
                where: {
                    idUser: user.idUser,
                }
            });
            return address;
        } catch (error) {
            throw(error);
        }
    }

    async update(body: CreationAttributes<AddressInterface>, user: PayloadParams) {
        try {
            const updatedAddress = await Address.update(body, {
                where: {
                    idUser: user.idUser,
                }
            });
            return updatedAddress;
        } catch (error) {
            throw(error);
        }
    }


}

export const AddressService = new AddressServiceClass();
