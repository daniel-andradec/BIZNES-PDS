import { CreationAttributes } from "sequelize";
import { ProductInterface } from "../models/Product";
import { PayloadParams } from "../../users/types/PayloadParams";
import { Attributes} from "sequelize/types";

export interface ProductRepository {
    create(body: CreationAttributes<ProductInterface>, user: PayloadParams, file: any): Promise<ProductInterface>;
    getAllByStore(idUser: string): Promise<ProductInterface[]>;
    getAll(): Promise<ProductInterface[]>;
    getById(idProduct: string): Promise<ProductInterface | null>;
    update(idProduct: string, body: Attributes<ProductInterface>, file: any): Promise<null | void>;
    delete(idProduct: string, user: PayloadParams): Promise<void>;
}