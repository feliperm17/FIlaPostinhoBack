import express, { Request, Response } from 'express';
import { queueController } from '../controllers/controller';
import { authentication } from '../middlewares/authentication';
import { checkPermissions } from '../middlewares/permission';

const queueRoutes = express.Router();

queueRoutes.post('/queue',
    authentication,
    checkPermissions(false), 
    (req: Request, res: Response) => {
    queueController.createQueue(req, res);
});
queueRoutes.get('/queue',
    authentication,
    checkPermissions(false), 
    (req: Request, res: Response) => {
    queueController.findAllQueues(req, res)}
);
queueRoutes.get('/queue/:id',
    authentication,
    checkPermissions(false), 
    (req: Request, res: Response) => {
    queueController.findQueueById(req, res)
});

queueRoutes.put('/queue/:id',
    authentication,
    checkPermissions(true), 
    (req: Request, res: Response) => {
    queueController.updateQueue(req, res);
});

queueRoutes.delete('/queue/:id',
    authentication,
    checkPermissions(true), 
    (req: Request, res: Response) => {
    queueController.deleteQueue(req, res);
});

queueRoutes.post('/queue/:queueId/join',
    authentication,
    checkPermissions(false),
    (req: Request, res: Response) => {
      queueController.joinQueue(req, res);
});

queueRoutes.get('/queue/:queueId/position',
    authentication,
    checkPermissions(false),
    (req: Request, res: Response) => {
      queueController.getUserPosition(req, res);
});

queueRoutes.get('/queues/:queueId/users',
    authentication,
    checkPermissions(true), 
    (req: Request, res: Response) => {
      queueController.getQueueUsers(req, res);    
});

queueRoutes.post('/queues/:queueId/next',
    authentication,
    checkPermissions(true),
    (req: Request, res: Response) => {
      queueController.advanceQueue(req, res);
});

queueRoutes.get('/queues/:queueId/all',
    authentication,
    checkPermissions(true),
    (req: Request, res: Response) => {
      queueController.getFullQueue(req, res);
});

export default queueRoutes;
