import { Router } from 'express';
import UserController from 'controller'

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/users', (req: Request, res: Response) => userController.createUser(req, res));
userRoutes.get('/users', (req: Request, res: Response) => userController.findAllUsers(req, res));
userRoutes.get('/users/:id', (req: Request, res: Response) => userController.findByUserId(req, res));
userRoutes.put('/users/:id', (req: Request, res: Response) => userController.updateUser(req, res));
userRoutes.delete('/users/:id', (req: Request, res: Response) => userController.deleteUser(req, res));

export { userRoutes };