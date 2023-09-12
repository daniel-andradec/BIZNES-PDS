import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../../../../database/index';
import { User } from '../../users/models/User';

export interface VendorInterface extends Model<InferAttributes<VendorInterface>, InferCreationAttributes<VendorInterface>> {
    idVendor: CreationOptional<number>;
    CNPJ: string;
    companyName: string;
    fantasyName: string;
    phone: string;
    devolutionPolicy: string;  
}

export interface VendorCreationAttributes extends InferCreationAttributes<VendorInterface> {
    name: string;
    email: string;
    password: string;
    role: string;
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
        type: DataTypes.STRING,
        allowNull: false,
    }
});

Vendor.belongsTo(User, { foreignKey: 'idUser' });

User.hasOne(Vendor, { foreignKey: 'idUser' });

Vendor.sync({alter: false, force: false})
  .then(() => {
    console.log('User table was (re)created');
  })
  .catch((err) => console.log(err));