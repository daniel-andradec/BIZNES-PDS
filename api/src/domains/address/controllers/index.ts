import { Router, Request, Response, NextFunction } from 'express';
import { SequelizeAddressRepository } from '../adapters/SequelizeAddressRepository';
import { loginMiddleware, verifyJWT, checkRole, notLoggedIn } from '../../../middlewares/auth-middlewares';
import { userRoles } from '../../users/constants/userRoles';
import { statusCodes } from '../../../../utils/constants/statusCodes';
import { AddressService } from '../ports/AddressService';

export const router = Router();

const addressRepository = new SequelizeAddressRepository();
const addressService = new AddressService(addressRepository);

router.get('/',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const address = await addressService.getAddress(req.user!);
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
      const address = await addressService.update(req.body, req.user!.idUser);
      res.status(statusCodes.SUCCESS).json(address);
    } catch (error) {
      next(error);
    }
  }
);

