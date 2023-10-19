import { Router, Request, Response, NextFunction } from 'express';
import { verifyJWT, checkRole } from '../../../middlewares/auth-middlewares';
import { statusCodes } from '../../../../utils/constants/statusCodes';
import { TransactionService } from '../ports/TransactionService';
import { SequelizeTransactionRepository } from '../adapters/SequelizeTransactionRepository';
import { userRoles } from '../../users/constants/userRoles';

export const router = Router();

const transactionRepository = new SequelizeTransactionRepository();
const transactionService = new TransactionService(transactionRepository);

router.post('/',
    verifyJWT,
    checkRole([userRoles.customer]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await transactionService.create(req.body.transaction, req.body.transactionProducts);
            res.status(statusCodes.CREATED).end();
        } catch (error) {
            next(error);
        }
    }
);

router.get('/',
    verifyJWT,
    //checkRole([userRoles.admin]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const transactions = await transactionService.getAll();
            res.status(statusCodes.SUCCESS).json(transactions);
        }
        catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    verifyJWT,
    //checkRole([userRoles.admin]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const transaction = await transactionService.getById(req.params.id);
            res.status(statusCodes.SUCCESS).json(transaction);
        }
        catch (error) {
            next(error);
        }
    }
);

router.get('/user/:id',
    verifyJWT,
    checkRole([userRoles.customer]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const transactions = await transactionService.getByUserId(req.params.id);
            res.status(statusCodes.SUCCESS).json(transactions);
        }
        catch (error) {
            next(error);
        }
    }
);


