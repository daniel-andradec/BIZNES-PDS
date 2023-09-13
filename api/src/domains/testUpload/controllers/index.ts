import { Router, Request, Response, NextFunction } from 'express';
import { loginMiddleware,
    verifyJWT,
    notLoggedIn } from '../../../middlewares/auth-middlewares';
import { statusCodes } from '../../../../utils/constants/statusCodes';
import { TestPhotoService } from '../service/testPhotoService';
import { upload } from '../../../../utils/functions/aws';

export const router = Router();

router.post('/',
    upload.single('photo'),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
        if(req.file){
            req.body.photo = (req.file as Express.MulterS3.File).location;
            req.body.awsKey = (req.file as Express.MulterS3.File).key;
        }
        await TestPhotoService.create(req.body);
        res.status(statusCodes.CREATED).end();
        } catch (error) {
        next(error);
        }
    }
);

router.delete('/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await TestPhotoService.delete(req.params.id);
            res.status(statusCodes.SUCCESS).end();
        } catch (error) {
            next(error);
        }
    }
);