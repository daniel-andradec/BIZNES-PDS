import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../../../../database/index';

export interface CustomerInterface extends Model<InferAttributes<CustomerInterface>, InferCreationAttributes<CustomerInterface>> {
    idCustomer: CreationOptional<number>;
    CPF: string;
    birthDate: Date;
    phone: string;
    email: string;
    password: string;
}

export const Customer = sequelize.define<CustomerInterface>('Customers', {
    idCustomer: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    CPF: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

Customer.sync({ alter: false, force: false })
    .then(() => {
        console.log('Customer table was (re)created');
    })
    .catch((err) => console.log(err));

