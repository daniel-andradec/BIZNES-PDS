import { Router, Request, Response, NextFunction } from 'express';
import { loginMiddleware,
    verifyJWT,
    notLoggedIn } from '../../../middlewares/auth-middlewares';
import { statusCodes } from '../../../../utils/constants/statusCodes';
import { CustomerService } from '../service/CustomerService';
import { upload } from '../../../../utils/functions/aws';

export const router = Router();

router.post('/login', notLoggedIn, loginMiddleware);

router.post('/logout',
    verifyJWT,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.clearCookie('jwt');
            res.status(statusCodes.NO_CONTENT).end();
        } catch (error) {
            next(error);
        }
    },
);

router.post('/',
    upload.single('photo'),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
        await CustomerService.create(req.body, req.file);
        res.status(statusCodes.CREATED).end();
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

router.get('/:id',
    verifyJWT,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await CustomerService.getById(req.params.idUser!);
            res.status(statusCodes.SUCCESS).json(user);
        } catch (error) {
            next(error);
        }
    }
);

router.put('/:id',
    verifyJWT,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await CustomerService.update(req.params.idUser!, req.body, req.user!);;
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
            await CustomerService.delete(req.params.idUser!, req.user!);
            res.status(statusCodes.NO_CONTENT).end();
        } catch (error) {
            next(error);
        }
    }
);


