import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../../../../database/index';
import { Transaction } from '../../transaction/models/Transaction';
import { Product } from '../../product/models/Product';

export interface TransactionProductInterface extends Model<InferAttributes<TransactionProductInterface>, InferCreationAttributes<TransactionProductInterface>> {
    idTransactionProduct: CreationOptional<string>;
    idTransaction: string;
    idProduct: string;
    quantity: number;
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
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
});

TransactionProduct.belongsTo(Transaction, { foreignKey: 'idTransaction' });
Transaction.hasMany(TransactionProduct, { foreignKey: 'idTransaction', onDelete: 'CASCADE' });

TransactionProduct.belongsTo(Product, { foreignKey: 'idProduct' });
Product.hasMany(TransactionProduct, { foreignKey: 'idProduct', onDelete: 'CASCADE' });

TransactionProduct.sync({alter: false, force: false})
    .then(() => {
        console.log('TransactionProduct table was (re)created');
    })
    .catch((err) => console.log(err));

