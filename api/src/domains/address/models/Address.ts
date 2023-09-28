import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../../../../database/index';
import { User } from '../../users/models/User';

export interface AddressInterface extends Model<InferAttributes<AddressInterface>, InferCreationAttributes<AddressInterface>> {
    idAddress: CreationOptional<string>;
    street: string;
    number: number;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
    idUser: string;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}

export interface AddressCreationAttributes extends InferCreationAttributes<AddressInterface> {
    name: string;
    email: string;
    password: string;
}

export const Address = sequelize.define<AddressInterface>('Addresses', {
    idAddress: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    complement: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    neighborhood: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idUser: {
        type: DataTypes.STRING,
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

Address.belongsTo(User, { foreignKey: 'idUser' });
User.hasOne(Address, { foreignKey: 'idUser', onDelete: 'CASCADE' });

Address.sync({alter: false, force: false})
    .then(() => {
    console.log('Address table was (re)created');
    })
    .catch((err) => console.log(err));