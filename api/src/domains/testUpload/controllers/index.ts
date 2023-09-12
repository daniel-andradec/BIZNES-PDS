import { Router, Request, Response, NextFunction } from 'express';
import { loginMiddleware,
    verifyJWT,
    notLoggedIn } from '../../../middlewares/auth-middlewares';
import { statusCodes } from '../../../../utils/constants/statusCodes';
import { TestPhotoService } from '../service/testPhotoService';

export const router = Router();

//create
router.post('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
        await TestPhotoService.create(req.body);
        res.status(statusCodes.CREATED).end();
        } catch (error) {
        next(error);
        }
    }
);