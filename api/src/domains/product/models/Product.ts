import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../../../../database/index';
import { Vendor } from '../../vendor/models/Vendor';

export interface ProductInterface extends Model<InferAttributes<ProductInterface>, InferCreationAttributes<ProductInterface>> {
    idProduct: CreationOptional<string>;
    name: string;
    description: string;
    price: number;
    quantity: number;
    photo: string;
    awsKey: string;
    idVendor: string;
    options: string;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
};

export const Product = sequelize.define<ProductInterface>('Products', {
    idProduct: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(1000),
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    awsKey: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    options: {
        type: DataTypes.STRING(1000),
        allowNull: false,
    },
    idVendor: {
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

Product.belongsTo(Vendor, { foreignKey: 'idVendor' });

Vendor.hasMany(Product, { 
    foreignKey: 'idVendor',
    onDelete: 'CASCADE',
});


Product.sync({alter: false, force: false})
  .then(() => {
    console.log('Product table was (re)created');
  })
  .catch((err) => console.log(err));