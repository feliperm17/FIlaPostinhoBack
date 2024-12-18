import express, { Request, Response } from 'express';
import { queueController } from '../controllers/controller';
import { authentication } from '../middlewares/authentication';
import { checkPermissions } from '../middlewares/permission';

const queueRoutes = express.Router();

queueRoutes.post('/queue',
    authentication,
    checkPermissions(true), 
    (req: Request, res: Response) => {
    queueController.createQueue(req, res);
});
queueRoutes.get('/queue',
    authentication,
    checkPermissions(true), 
    (req: Request, res: Response) => {
    queueController.findAllQueues(req, res)}
);
queueRoutes.get('/queue/:id',
    authentication,
    checkPermissions(true), 
    (req: Request, res: Response) => {
    queueController.findQueueById(req, res)
});

export default queueRoutes;
