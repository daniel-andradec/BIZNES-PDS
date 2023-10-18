import { Router, Request, Response, NextFunction } from 'express';
import { SequelizeUserRepository } from '../adapters/SequelizeUserRepository';
import { loginMiddleware, verifyJWT, checkRole, notLoggedIn } from '../../../middlewares/auth-middlewares';
import { userRoles } from '../../users/constants/userRoles';
import { statusCodes } from '../../../../utils/constants/statusCodes';
import { UserService } from '../ports/UserService';

export const router = Router();
const userRepository = new SequelizeUserRepository();
const userService = new UserService(userRepository);

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
  }
);

router.put('/password',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userService.updatePassword(req.user!.idUser, req.body.newPassword, req.body.oldPassword, req.user!);
      res.status(statusCodes.SUCCESS).json('Senha alterada com sucesso!').end();
    } catch (error) {
      next(error);
    }
  }
);

router.get('/',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.getAll();
      res.status(statusCodes.SUCCESS).json(users);
    } catch(error){
      next(error);
    }
  }
);

router.get('/user',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.getById(req.user!.idUser);
      res.status(statusCodes.SUCCESS).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.getById(req.params.id!);
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
      await userService.update(req.params.id, req.body, req.user!);
      res.status(statusCodes.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  verifyJWT,
  checkRole([userRoles.admin]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userService.delete(req.params.id);
      res.status(statusCodes.NO_CONTENT).end();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
