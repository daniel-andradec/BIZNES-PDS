import { Router, Request, Response, NextFunction } from 'express';
import { VendorService } from '../services/VendorService';
import { verifyJWT, checkRole } from '../../../middlewares/auth-middlewares';
import { userRoles } from '../../users/constants/userRoles';
import { statusCodes } from '../../../../utils/constants/statusCodes';

export const router = Router();

router.post('/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vendor = await VendorService.create(req.body);
      res.status(statusCodes.CREATED).json().end();
    } catch (error) {
      next(error);
    }
  },
);

router.get('/logged',
    verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vendor = await VendorService.getLogged(req.user!.idUser);
      res.status(statusCodes.SUCCESS).json(vendor);
    } catch (error) {
      next(error);
    }
  }
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
      const vendor = await VendorService.update(req.params.id!, req.body, req.user!);
      console.log(vendor);
      res.status(statusCodes.SUCCESS).json(vendor).end();
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id',
    verifyJWT,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await VendorService.delete(req.params.idUser!, req.user!);
            res.status(statusCodes.NO_CONTENT).end();
        } catch (error) {
            next(error);
        }
    },
);





