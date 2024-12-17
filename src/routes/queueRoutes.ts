import express, { Request, Response } from 'express';
import QueueController from '../controllers/QueueController';

const queueRoutes = express.Router();
const queueController = new QueueController.QueueController();

queueRoutes.post('/queue', (req: Request, res: Response) => {
    queueController.createQueue(req, res);
});