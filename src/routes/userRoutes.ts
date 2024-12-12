import express, { Request, Response } from 'express';
import UserController from '../controllers/controller';

const userRoutes = express.Router();
const userController = new UserController.UserController();

userRoutes.post('/users', (req: Request, res: Response) => {
    userController.createUser(req, res);
});
userRoutes.get('/users', (req: Request, res: Response) => {
    userController.findAllUsers(req, res)}
);
userRoutes.get('/users/:id', (req: Request, res: Response) => {
    userController.findByUserId(req, res)
});
userRoutes.put('/users/:id', (req: Request, res: Response) => {
    userController.updateUser(req, res)
});
userRoutes.delete('/users/:id', (req: Request, res: Response) => {
    userController.deleteUser(req, res)
});

export default userRoutes;
