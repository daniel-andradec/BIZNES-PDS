import { Router, Request, Response, NextFunction } from 'express';
import { loginMiddleware,
    verifyJWT,
    notLoggedIn } from '../../../middlewares/auth-middlewares';
import { statusCodes } from '../../../../utils/constants/statusCodes';

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
    async (req: Request, res: Response, next: NextFunction) => {
        try {
        //await CustomerService.create(req.body);
        res.status(statusCodes.CREATED).end();
        } catch (error) {
        next(error);
        }
    },
);
