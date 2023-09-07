import { Sequelize } from 'sequelize';
import { getEnv } from '../utils/functions/getEnv';

export const sequelize = new Sequelize(
  {
    dialect: 'sqlite',
    storage: './database.sqlite',
  },
);