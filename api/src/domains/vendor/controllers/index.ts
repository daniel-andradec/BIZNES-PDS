import { Router, Request, Response, NextFunction } from 'express';
import { VendorService } from '../services/VendorService';
import { verifyJWT, checkRole } from '../../../middlewares/auth-middlewares';
import { userRoles } from '../../users/constants/userRoles';
import { statusCodes } from '../../../../utils/constants/statusCodes';
import { upload } from '../../../../utils/functions/aws';

export const router = Router();

router.post('/',
  upload.single('photo'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await VendorService.create(req.body, req.file);
      res.status(statusCodes.CREATED).json("Vendor created").end();
    } catch (error) {
      next(error);
    }
  },
);

router.get('/',
    verifyJWT,
    checkRole([userRoles.admin]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const vendors = await VendorService.getAll();
            res.status(statusCodes.SUCCESS).json(vendors);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
  verifyJWT,
  checkRole([userRoles.admin]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await VendorService.getById(req.params.idUser!);
      res.status(statusCodes.SUCCESS).json(user);
    } catch (error) {
      next(error);
    }
  },
);


router.put('/:id',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await VendorService.update(req.params.idUser!, req.body, req.user!);
      res.status(statusCodes.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id',
    verifyJWT,
    //checkRole([userRoles.admin]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await VendorService.delete(req.params.idUser!, req.user!);
            res.status(statusCodes.NO_CONTENT).end();
        } catch (error) {
            next(error);
        }
    },
);





