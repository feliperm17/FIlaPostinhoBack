import express, { Request, Response } from 'express';
import { userController } from '../controllers/controller';
import { authentication } from '../middlewares/authentication';
import { checkPermissions } from '../middlewares/permission';

const userRoutes = express.Router();

userRoutes.post('/auth/register', (req: Request, res: Response) => {
    userController.register(req, res);
});

userRoutes.post('/auth/login', (req: Request, res: Response) => {
    userController.login(req, res);
});

userRoutes.get('/users',
    authentication,
    (req: Request, res: Response) => {
    userController.findAllUsers(req, res);
});

userRoutes.get('/users/:id',
    authentication,
    (req: Request, res: Response) => {
    userController.findByUserId(req, res);
});

userRoutes.put('/users/:id',
    authentication,
    (req: Request, res: Response) => {
    userController.updateUser(req, res);
});

userRoutes.delete('/users/:id',
    authentication,
    checkPermissions(true),
    (req: Request, res: Response) => {
    userController.deleteUser(req, res);
});

userRoutes.post('/auth/register/admin', (req: Request, res: Response) => {
    userController.registerAdmin(req, res);
});

userRoutes.put('/users/promote/:id',
    authentication,
    checkPermissions(true),
    (req: Request, res: Response) => {
    userController.promoteUser(req, res);
});

userRoutes.put('/users/demote/:id',
    authentication,
    checkPermissions(true),
    (req: Request, res: Response) => {
    userController.demoteUser(req, res);
});

export default userRoutes;
