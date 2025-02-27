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

queueRoutes.get('/queue/position',
    authentication,
    checkPermissions(false),
    (req: Request, res: Response) => {
      queueController.getUserPosition(req, res);
});

queueRoutes.get('/queue/:userId/position',
    authentication,
    checkPermissions(false),
    (req: Request, res: Response) => {
        queueController.getPosition(req,res);
    }
)

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

queueRoutes.post('/queue/:specialtyId/join',
    authentication,
    checkPermissions(false),
    (req: Request, res: Response) => {
      queueController.joinQueue(req, res);
});

queueRoutes.get('/queue/:queueId/users',
    authentication,
    checkPermissions(true), 
    (req: Request, res: Response) => {
      queueController.getQueueUsers(req, res);    
});

queueRoutes.post('/queue/:queueId/next',
    authentication,
    checkPermissions(true),
    (req: Request, res: Response) => {
      queueController.advanceQueue(req, res);
});

queueRoutes.post('/queue/:queueId/skip',
    authentication,
    checkPermissions(true), 
    (req: Request, res: Response) => {
      queueController.skipUser(req, res);
});
  
queueRoutes.post('/queue/:queueId/confirm',
    authentication,
    checkPermissions(true), 
    (req: Request, res: Response) => {
        queueController.confirmUser(req, res);
});

queueRoutes.get('/queue/:queueId/all',
    authentication,
    checkPermissions(true),
    (req: Request, res: Response) => {
      queueController.getFullQueue(req, res);
});

queueRoutes.post('/queue/:queueId/leave',
    authentication,
    checkPermissions(false),
    (req: Request, res: Response) => {
      queueController.leaveQueue(req, res);
});

export default queueRoutes;
