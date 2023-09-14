import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../../../../database/index';
import { User } from '../../users/models/User';

export interface VendorInterface extends Model<InferAttributes<VendorInterface>, InferCreationAttributes<VendorInterface>> {
    idVendor: CreationOptional<string>;
    CNPJ: string;
    companyName: string;
    fantasyName: string;
    phone: string;
    devolutionPolicy: string;  
    idUser: string;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}

export interface VendorCreationAttributes extends InferCreationAttributes<VendorInterface> {
    name: string;
    email: string;
    password: string;
}

export const Vendor = sequelize.define<VendorInterface>('Vendors', {
    idVendor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    CNPJ: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fantasyName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    devolutionPolicy: {
        type: DataTypes.STRING(1000),
        allowNull: false,
    },
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

Vendor.belongsTo(User, { foreignKey: 'idUser' });

User.hasOne(Vendor, { 
    foreignKey: 'idUser',
    onDelete: 'CASCADE',
});

Vendor.sync({alter: false, force: false})
  .then(() => {
    console.log('User table was (re)created');
  })
  .catch((err) => console.log(err));