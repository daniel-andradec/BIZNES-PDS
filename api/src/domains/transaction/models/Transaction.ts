import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../../../../database/index';


export interface TransactionInterface extends Model<InferAttributes<TransactionInterface>, InferCreationAttributes<TransactionInterface>> {
    idTransaction: CreationOptional<string>;
    idUser: string;
    date: Date;
    deliveryDate: Date;
    paymentMethod: string;
    shippingCost: number;
    total: number;
    idProduct: string;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
    }

export const Transaction = sequelize.define<TransactionInterface>('Transactions', {
    idTransaction: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    deliveryDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shippingCost: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    idProduct: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
});