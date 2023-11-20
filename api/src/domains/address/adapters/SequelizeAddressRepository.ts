import {Address, AddressInterface} from "../models/Address";
import {CreationAttributes} from "sequelize";
import {AddressRepository} from "../repository/AddressRepository";
import {PayloadParams} from "../../users/types/PayloadParams";

export class SequelizeAddressRepository implements AddressRepository{
    async create(body: CreationAttributes<AddressInterface>) {
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
                idTransaction: body.idTransaction,
            };
            const address = await Address.create(newAddress);
            return address;
        } catch (error) {
            throw(error);
        }
    }

    async getAddress(id: string) {
        try {
            const address = await Address.findOne({
                where: {
                    idUser: id, 
                }
            });
            return address;
        } catch (error) {
            throw(error);
        }
    }

    async update(body: CreationAttributes<AddressInterface>, idUser: string): Promise<AddressInterface> {
        try {
            await Address.update(body, {
                where: {
                    idUser: idUser,
                }
            });
            
            const updatedAddress = await Address.findOne({
                where: {
                    idUser: idUser,
                }
            });
    
            if (!updatedAddress) {
                throw new Error("Endereço não encontrado após a atualização");
            }
    
            return updatedAddress;
    
        } catch (error) {
            throw(error);
        }
    }    
}
