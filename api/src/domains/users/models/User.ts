import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../../../../database/index';
import { userRoles } from '../constants/userRoles';

export interface UserInterface extends Model<InferAttributes<UserInterface>, InferCreationAttributes<UserInterface>> {
  idUser: CreationOptional<string>;
  name: string;
  email: string;
  password: string;
  role: string;
  balance: number;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

export const User = sequelize.define<UserInterface>('Users', {
  idUser: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
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
  },
  role: {
    type: DataTypes.ENUM,
    values: [userRoles.admin, userRoles.customer, userRoles.seller],
    allowNull: false,
  },
  balance: {
    type: DataTypes.FLOAT,
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

//User.hasOne(Customer, { foreignKey: 'idUser' });

User.sync({alter: false, force: false})
  .then(() => {
    console.log('User table was (re)created');
  })
  .catch((err) => console.log(err));