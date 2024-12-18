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
  async findAllQueues(req: Request, res: Response) {
    try {
      const queue = await this.queueService.findAll();
      return res.json(queue);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar Filas' });
    }
  }

  async findQueueById(req: Request, res: Response) {
    try {
      const queue = await this.queueService.findById(req.params.id);
      if (!queue) return res.status(404).json({ error: 'Fila não encontrada' });
      return res.json(queue);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar Fila' });
    }
  }
}
export default QueueController;