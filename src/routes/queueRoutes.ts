import express, { Request, Response } from 'express';
import controller from '../controllers/controller';

const queueRoutes = express.Router();
const queueController = new controller.QueueController();

queueRoutes.post('/queue', (req: Request, res: Response) => {
    queueController.createQueue(req, res);
});
queueRoutes.get('/queue', (req: Request, res: Response) => {
    queueController.findAllQueues(req, res)}
);
queueRoutes.get('/queue/:id', (req: Request, res: Response) => {
    queueController.findQueueById(req, res)
});

export default queueRoutes;
