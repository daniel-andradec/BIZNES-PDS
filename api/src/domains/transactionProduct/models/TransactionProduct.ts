import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../../../../database/index';
import { Transaction } from '../../transaction/models/Transaction';
import { Product } from '../../product/models/Product';

export interface TransactionProductInterface extends Model<InferAttributes<TransactionProductInterface>, InferCreationAttributes<TransactionProductInterface>> {
    idTransactionProduct: CreationOptional<string>;
    idTransaction: string;
    idProduct: string;
    quantity: number;
    selectedOption: string;
    price: number;
    productName: string;
    productPhoto: string;
    productCategory: string;
    vendorName: string;
    idVendor: string;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}

export const TransactionProduct = sequelize.define<TransactionProductInterface>('TransactionProducts', {
    idTransactionProduct: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    idTransaction: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idProduct: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    selectedOption: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productPhoto: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    productCategory: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vendorName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idVendor: {
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

TransactionProduct.belongsTo(Transaction, { foreignKey: 'idTransaction', onDelete: 'CASCADE' });
Transaction.hasMany(TransactionProduct, { foreignKey: 'idTransaction' });

TransactionProduct.sync({alter: false, force: false})
    .then(() => {
        console.log('TransactionProduct table was (re)created');
    })
    .catch((err) => console.log(err)); 

