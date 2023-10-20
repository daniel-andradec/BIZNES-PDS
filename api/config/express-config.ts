import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import { getEnv } from '../utils/functions/getEnv';

dotenv.config();
export const app: Express = express();

const options: CorsOptions = {
  origin: getEnv('APP_URL'),
  credentials: true
};
app.use(cors(options));

app.use(cookieParser());

app.use(express.urlencoded({
  extended: true,
}));

app.use(express.json());

import { router as usersRouter } from '../src/domains/users/controllers/index';
app.use('/api/users', usersRouter);

import { router as customerRouter } from '../src/domains/customer/controllers/index';
app.use('/api/customer', customerRouter);

import { router as vendorRouter } from '../src/domains/vendor/controllers/index';
app.use('/api/vendor', vendorRouter);

import { router as productRouter } from '../src/domains/product/controllers/index';
app.use('/api/product', productRouter);

import { router as addressRouter } from '../src/domains/address/controllers/index';
app.use('/api/address', addressRouter);

import { router as transactionRouter } from '../src/domains/transaction/controllers/index';
app.use('/api/transaction', transactionRouter);

import { errorHandler } from '../src/middlewares/error-handler';
app.use(errorHandler);