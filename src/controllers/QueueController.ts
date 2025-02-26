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
  async updateQueue(req: Request, res: Response) {
    try {
      const queue = await this.queueService.update(req.params.id, req.body);
      if (!queue) return res.status(404).json({ error: 'Fila não encontrada' });
      return res.json(queue);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar Fila' });
    }
  }

  async deleteQueue(req: Request, res: Response) {
    try {
      const success = await this.queueService.delete(req.params.id);
      if (!success) return res.status(404).json({ error: 'Fila não encontrada' });
      return res.json({ message: 'Fila deletada' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar Fila' });
    }
  }

  async nextItem(req: Request, res: Response) {
    try{
      const success = await this.queueService.nextItem(req.params.id);
      if (!success) return res.status(404).json({ error: 'Fila não encontrada' });
      return res.json({ message: 'Fila avançada'});
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao avançar na Fila' });
    }
  }

  async getNextItem(req: Request, res: Response) {
    try {
      const item = await this.queueService.getNextItem(req.params.id);
      if(!item) return res.status(404).json({ error: 'Fila não encontrada' });
      return res.json(item);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao retornar o próximo item' });
    }
  }

  async callNextItem(req: Request, res: Response) { // teste
    try {
      const nextItem = await this.queueService.callNextItem(req.params.queueId);
      if (!nextItem) {
        return res.status(404).json({ error: 'Não há mais pacientes na fila' });
      }
      return res.json(nextItem);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao avançar a fila' });
    }
  }

  async joinQueue(req: Request, res: Response) {
    try {
      const specialtyId = parseInt(req.params.specialtyId);
      const userId = res.locals.user.account_id; // ID do usuário autenticado

      const currentQueue = await this.queueService.checkUserInQueue(userId);
      if (currentQueue) {
        return res.status(400).json({
          error: `Você já está na fila de ${currentQueue.specialty_name}`,
          current_queue: {
            queue_id: currentQueue.queue_id,
            specialty_id: currentQueue.specialty,
            specialty: currentQueue.specialty_name,
            item_st: currentQueue.item_st,
            entry_time: currentQueue.entry_time,
            position: currentQueue.position,
            estimated_wait: currentQueue.estimated_time_per_user * currentQueue.position,
          }
        });
      }

      const queueItem = await this.queueService.joinQueue(specialtyId, userId);
      return res.status(201).json(queueItem);
    } catch (error) {
      if (error.message === 'Usuário já está nesta fila') {
        return res.status(409).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro ao entrar na fila' });
    }
  }

  async getUserPosition(req: Request, res: Response) {
    try {
      const userId = res.locals.user.account_id;

      const currentQueue = await this.queueService.getUserPosition(userId);
      
      if (!currentQueue) {
        return res.status(404).json({ error: 'Você não está em nenhuma fila' });
      }

      return res.json({ 
        queue_id: currentQueue.queue_id,
        specialty_id: currentQueue.specialty,
        specialty: currentQueue.specialty_name,
        item_st: currentQueue.item_st,
        entry_time: currentQueue.entry_time,
        position: currentQueue.position,
        estimated_wait: currentQueue.estimated_time * currentQueue.position,
       });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar posição na fila' });
    }
  }

  async getQueueUsers(req: Request, res: Response) {
    try {
      const queueId = parseInt(req.params.queueId);
      const users = await this.queueService.getQueueUsers(queueId);

      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar usuários da fila' });
    }
  }

  async advanceQueue(req: Request, res: Response) {
    try {
      const queueId = req.params.queueId;
      const nextUser = await this.queueService.advanceQueue(queueId);

      if (!nextUser) {
        return res.status(404).json({ 
          message: 'Nenhum próximo paciente na fila',
          current: null
        });
      }

      return res.json({
        message: 'Fila avançada com sucesso',
        current: nextUser
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao avançar a fila' });
    }
  }

  async getFullQueue(req: Request, res: Response) {
    try {
      const queueId = parseInt(req.params.queueId);
      const users = await this.queueService.getFullQueue(queueId);
      
      return res.json(users); // Retorna array vazio se não houver registros
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar histórico da fila' });
    }
  }


  async leaveQueue(req: Request, res: Response) {
    try {
      const queueId = parseInt(req.params.queueId);
      const userId = res.locals.user.account_id;

      const leftQueue = await this.queueService.leaveQueue(queueId, userId);
      return res.json({ 
        message: 'Você saiu da fila com sucesso',
        details: leftQueue
      });
    } catch (error) {
      if (error.message === 'Você não está nesta fila ou já foi atendido') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro ao sair da fila' });
    }
  }

  async getPosition(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);

      const currentQueue = await this.queueService.getUserPosition(userId);
      
      if (!currentQueue) {
        return res.status(404).json({ error: 'Você não está em nenhuma fila' });
      }

      return res.json({ 
        queue_id: currentQueue.queue_id,
        specialty_id: currentQueue.specialty,
        specialty: currentQueue.specialty_name,
        item_st: currentQueue.item_st,
        entry_time: currentQueue.entry_time,
        position: currentQueue.position,
        estimated_wait: currentQueue.estimated_time * currentQueue.position,
       });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar posição na fila' });
    }
  }
}

export default QueueController;