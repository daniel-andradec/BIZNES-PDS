import { Router, Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/ProductService';
import { verifyJWT, checkRole } from '../../../middlewares/auth-middlewares';
import { userRoles } from '../../users/constants/userRoles';
import { statusCodes } from '../../../../utils/constants/statusCodes';
import { upload } from '../../../../utils/functions/aws';

export const router = Router();

router.post('/',
    verifyJWT,
    checkRole([userRoles.vendor]),
    upload.single('photo'),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await ProductService.create(req.body, req.user!, req.file);
            res.status(statusCodes.CREATED).end();
        } catch (error) {
            next(error);
        }
    }
);

router.get('/all',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await ProductService.getAll();
            res.status(statusCodes.SUCCESS).json(products);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/',
    verifyJWT,
    checkRole([userRoles.vendor]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await ProductService.getAllByStore(req.user!.idUser);
            res.status(statusCodes.SUCCESS).json(products);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/store/:id',
    verifyJWT,
    checkRole([userRoles.vendor, userRoles.admin, userRoles.customer]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await ProductService.getAllByStore(req.params.id);
            res.status(statusCodes.SUCCESS).json(products);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    verifyJWT,
    checkRole([userRoles.vendor, userRoles.admin, userRoles.customer]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = await ProductService.getById(req.params.id);
            res.status(statusCodes.SUCCESS).json(product);
        } catch (error) {
            next(error);
        }
    }
);

router.put('/:id',
    verifyJWT,
    checkRole([userRoles.vendor, userRoles.admin]),
    upload.single('photo'),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await ProductService.update(req.params.id, req.body, req.file);
            res.status(statusCodes.NO_CONTENT).end();
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    verifyJWT,
    checkRole([userRoles.vendor, userRoles.admin]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await ProductService.delete(req.params.id, req.user!);
            res.status(statusCodes.NO_CONTENT).end();
        } catch (error) {
            next(error);
        }
    }
);
