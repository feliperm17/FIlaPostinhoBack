import { Request, Response } from 'express';
import { QueueService } from '../services/QueueService';

class QueueController {
  private queueService: QueueService;

  constructor() {
    this.queueService = new QueueService();
  }

  async createQueue(req: Request, res: Response) {
    try {
      const user = await this.queueService.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao criar Fila' });
    }
  }
}
export default QueueService;