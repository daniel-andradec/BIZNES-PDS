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

}

export const AddressService = new AddressServiceClass();
