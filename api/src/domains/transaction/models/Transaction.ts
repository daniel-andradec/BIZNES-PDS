import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../../../../database/index';
import { User } from '../../users/models/User';
import { Address } from '../../address/models/Address';


export interface TransactionInterface extends Model<InferAttributes<TransactionInterface>, InferCreationAttributes<TransactionInterface>> {
    idTransaction: CreationOptional<string>;
    idUser: string;
    recipientName: string;
    date: Date;
    deliveryDate: Date;
    paymentMethod: string;
    shippingCost: number;
    total: number;
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
    recipientName: {
        type: DataTypes.STRING,
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
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
});

User.hasMany(Transaction, { foreignKey: 'idUser'});
Transaction.belongsTo(User, { foreignKey: 'idUser', onDelete: 'CASCADE' });


Transaction.sync({alter: false, force: false})
    .then(() => {
        console.log('Transaction table was (re)created');
    })
    .catch((err) => console.log(err));
