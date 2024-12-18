import express, { Request, Response } from 'express';
import { specialtyController } from '../controllers/controller';
import { authentication } from '../middlewares/authentication';
import { checkPermissions } from '../middlewares/permission';

const specialtyRoutes = express.Router();

// Todas as rotas requerem autenticação e permissão de administrador
specialtyRoutes.post('/specialties',
  authentication,
  checkPermissions(true),
  (req: Request, res: Response) => {
    specialtyController.create(req, res);
});

specialtyRoutes.get('/specialties',
  authentication,
  checkPermissions(true),
  (req: Request, res: Response) => {
    specialtyController.findAll(req, res);
});

specialtyRoutes.get('/specialties/:id',
  authentication,
  checkPermissions(true),
  (req: Request, res: Response) => {
    specialtyController.findById(req, res);
});

specialtyRoutes.put('/specialties/:id',
  authentication,
  checkPermissions(true),
  (req: Request, res: Response) => {
    specialtyController.update(req, res);
});

specialtyRoutes.delete('/specialties/:id',
  authentication,
  checkPermissions(true),
  (req: Request, res: Response) => {
    specialtyController.delete(req, res);
});

export default specialtyRoutes;