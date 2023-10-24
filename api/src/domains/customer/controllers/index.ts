import { Router, Request, Response, NextFunction } from 'express';
import { loginMiddleware,
    verifyJWT,
    notLoggedIn } from '../../../middlewares/auth-middlewares';
import { statusCodes } from '../../../../utils/constants/statusCodes';
import { CustomerService } from '../ports/CustomerService';
import { SequelizeCustomerRepository } from '../adapters/SequelizeCustomerRepository';
import { upload } from '../../../../utils/functions/aws';

export const router = Router();
const customerRepository = new SequelizeCustomerRepository();
const customerService = new CustomerService(customerRepository);

router.post('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body);
        const costumer = await customerService.create(req.body);
        res.status(statusCodes.CREATED).send(costumer);
        } catch (error) {
        next(error);
        }
    },
);

router.get('/',
    verifyJWT,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customers = await customerService.getAll();
            res.status(statusCodes.SUCCESS).json(customers);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/logged',
    verifyJWT,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customer = await customerService.getLogged(req.user!.idUser);
            res.status(statusCodes.SUCCESS).json(customer);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    verifyJWT,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await customerService.getById(req.params.id!);
            res.status(statusCodes.SUCCESS).json(user);
        } catch (error) {
            next(error);
        }
    }
);

router.put('/',
    verifyJWT,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await customerService.update(req.body, req.user!.idUser);;
            res.status(statusCodes.NO_CONTENT).end();
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    verifyJWT,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await customerService.delete(req.params.id!, req.user!);
            res.status(statusCodes.NO_CONTENT).end();
        } catch (error) {
            next(error);
        }
    }
);


