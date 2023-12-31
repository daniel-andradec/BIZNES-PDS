import { Router, Request, Response, NextFunction } from 'express';
import { loginMiddleware,
    verifyJWT,
    notLoggedIn } from '../../../middlewares/auth-middlewares';
import { statusCodes } from '../../../../utils/constants/statusCodes';
import { CustomerService } from '../ports/CustomerService';
import { SequelizeCustomerRepository } from '../adapters/SequelizeCustomerRepository';
import { upload } from '../../../../utils/functions/aws';

export const router = Router();

router.post('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body);
        const costumer = await CustomerService.create(req.body);
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
            const customers = await CustomerService.getAll();
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
            const customer = await CustomerService.getLogged(req.user!.idUser);
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
            const user = await CustomerService.getById(req.params.id!);
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
            await CustomerService.update(req.body, req.user!.idUser);;
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
            await CustomerService.delete(req.params.id!, req.user!);
            res.status(statusCodes.NO_CONTENT).end();
        } catch (error) {
            next(error);
        }
    }
);


