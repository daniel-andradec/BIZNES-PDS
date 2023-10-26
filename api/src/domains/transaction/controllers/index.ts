import { Router, Request, Response, NextFunction } from 'express';
import { verifyJWT, checkRole } from '../../../middlewares/auth-middlewares';
import { statusCodes } from '../../../../utils/constants/statusCodes';
import { TransactionService } from '../ports/TransactionService';
import { SequelizeTransactionRepository } from '../adapters/SequelizeTransactionRepository';
import { userRoles } from '../../users/constants/userRoles';

export const router = Router();

router.post('/',
    verifyJWT,
    checkRole([userRoles.customer]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await TransactionService.create(req.body.transaction, req.body.transactionProducts, req.body.address);
            res.status(statusCodes.CREATED).end();
        } catch (error) {
            next(error);
        }
    }
);

router.get('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const transactions = await TransactionService.getAll();
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
            const transaction = await TransactionService.getById(req.params.id);
            res.status(statusCodes.SUCCESS).json(transaction);
        }
        catch (error) {
            next(error);
        }
    }
);

router.get('/user/:id',
    verifyJWT,
    checkRole([userRoles.customer, userRoles.admin]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const transactions = await TransactionService.getByUserId(req.params.id);
            res.status(statusCodes.SUCCESS).json(transactions);
        }
        catch (error) {
            next(error);
        }
    }
);

router.get('/vendor/:id',
    verifyJWT,
    checkRole([userRoles.vendor, userRoles.admin]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const transactions = await TransactionService.getByVendorId(req.params.id);
            res.status(statusCodes.SUCCESS).json(transactions);
        }
        catch (error) {
            next(error);
        }
    }
);

