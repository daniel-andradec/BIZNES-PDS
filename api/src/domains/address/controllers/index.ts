import { Router, Request, Response, NextFunction } from 'express';
import { SequelizeAddressRepository } from '../adapters/SequelizeAddressRepository';
import { loginMiddleware, verifyJWT, checkRole, notLoggedIn } from '../../../middlewares/auth-middlewares';
import { userRoles } from '../../users/constants/userRoles';
import { statusCodes } from '../../../../utils/constants/statusCodes';
import { AddressService } from '../ports/AddressService';

export const router = Router();

router.get('/',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const address = await AddressService.getAddress(req.user!.idUser);
      res.status(statusCodes.SUCCESS).json(address);
    } catch (error) {
      next(error);
    }
  }
);

router.put('/',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const address = await AddressService.update(req.body, req.user!.idUser);
      res.status(statusCodes.SUCCESS).json(address);
    } catch (error) {
      next(error);
    }
  }
);

