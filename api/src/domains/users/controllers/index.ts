import { Router, Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import { loginMiddleware,
  verifyJWT,
  checkRole,
  notLoggedIn } from '../../../middlewares/auth-middlewares';
import { userRoles } from '../../users/constants/userRoles';
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

/* router.post('/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserService.create(req.body);
      res.status(statusCodes.CREATED).end();
    } catch (error) {
      next(error);
    }
  },
); */

router.get('/',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserService.getAll();
      res.status(statusCodes.SUCCESS).json(users);
    } catch(error){
      next(error);
    }
  },
);

router.get('/user',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserService.getById(req.user!.idUser);
      res.status(statusCodes.SUCCESS).json(user);
    } catch (error) {
      next(error);
    }
  },
);

router.get('/:id',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserService.getById(req.params.idUser!);
      res.status(statusCodes.SUCCESS).json(user);
    } catch (error) {
      next(error);
    }
  },
);


/* router.put('/:id',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserService.update(req.params.idUser!, req.body, req.user!);
      res.status(statusCodes.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  },
); */

/* router.delete('/:id',
  verifyJWT,
  checkRole([userRoles.admin]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserService.delete(req.params.id!, req.user!.idUser);
      res.status(statusCodes.NO_CONTENT).end();
    } catch (err) {
      next(err);
    }
  }); */

