import db from '../utils/db';
import dotenv from 'dotenv';
import queueQueries from '../queries/queueQueries';
dotenv.config();

export class QueueService {
  async create(queue: { 
    specialty: number; 
    queue_size: number;  
  }) {
    try {
      const queue_dt = new Date();
      const position_nr = 0;

      const result = await db.query(
        queueQueries.addQueue, 
        [queue.specialty, queue_dt, position_nr, queue.queue_size]
      );
      
      return result.rows[0];
    } catch (error) {
      console.error('Erro no QueueService.create:', error);
      throw error;
    }
  }

  async findAll() {
    try {
      const result = await db.query(queueQueries.getQueues);
      return result.rows;
    } catch (error) {
      console.error('Erro no QueueService.findAll:', error);
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const result = await db.query(queueQueries.getQueueById, [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro no QueueService.findById:', error);
      throw error;
    }
  }

  async update(id: string, queue: { 
    specialty: number; 
    queue_size: number;
    position_nr: number;
  }) {
    try {
      const { specialty, queue_size, position_nr } = queue;
      const result = await db.query(
        queueQueries.updateQueue, 
        [queue_size, position_nr, specialty, id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Erro no QueueService.update:', error);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const result = await db.query(queueQueries.deleteQueue, [id]);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Erro no QueueService.delete:', error);
      throw error;
    }
  }

  // Métodos adicionais úteis
  async findBySpecialty(specialtyId: number) {
    try {
      const result = await db.query(queueQueries.getQueueBySpecialty, [specialtyId]);
      return result.rows;
    } catch (error) {
      console.error('Erro no QueueService.findBySpecialty:', error);
      throw error;
    }
  }

  async getCurrentQueueSize(queueId: string) {
    try {
      const result = await db.query(queueQueries.getQueueSize, [queueId]);
      return parseInt(result.rows[0]?.total);
    } catch (error) {
      console.error('Erro no QueueService.getCurrentQueueSize:', error);
      throw error;
    }
  }

  async nextItem(queueId: string) {
    try {
      const result = await db.query(queueQueries.getNextItem, [queueId]);
      const item = result.rows[0];
      return item; //arrumar 
    } catch (error) {
      console.error('Erro ao andar a fila: ', error);
      throw error;
    }
  }   

  async getNextItem(queueId: string) {
    try {
      const result = await db.query(queueQueries.getNextItem, [queueId]);
      const item = result.rows[0];
      return item;
    } catch (error) {
      console.error('Erro ao retornar o próximo item da fila: ', error);
      throw error;
    }
  }

  async callNextItem(queueId: string) { // teste
    try {
      const result = await db.query(queueQueries.getNextItem, [queueId]);
      if (!result.rows[0]) {
        return null; // Fila vazia
      }
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao chamar próximo item:', error);
      throw error;
    }
  }

  async joinQueue(queueId: number, userId: number) {
    try {
      // Verificar se já está na fila
      const existing = await db.query(queueQueries.checkUserInQueue, [queueId, userId]);
      if (existing.rows.length > 0) {
        throw new Error('Usuário já está nesta fila');
      }

      // Entrar na fila
      const result = await db.query(queueQueries.joinQueue, [queueId, userId]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao entrar na fila:', error);
      throw error;
    }
  }

  async getUserPosition(queueId: number, userId: number) {
    try {
      const result = await db.query(queueQueries.getCurrentPosition, [queueId, userId]);
      return result.rows[0]?.position || null;
    } catch (error) {
      console.error('Erro ao buscar posição:', error);
      throw error;
    }
  }

  async getQueueUsers(queueId: number) {
    try {
      const result = await db.query(queueQueries.getQueueUsers, [queueId]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao listar usuários da fila:', error);
      throw error;
    }
  }

  async advanceQueue(queueId: string) {
    try {
      const result = await db.query(queueQueries.advanceQueue, [queueId]);
      
      // Retorna o próximo usuário em atendimento ou null se a fila estiver vazia
      return result.rows[0] || null;
    } catch (error) {
      console.error('Erro ao avançar a fila:', error);
      throw error;
    }
  }

  async getFullQueue(queueId: number) {
    try {
      const result = await db.query(queueQueries.getFullQueue, [queueId]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao listar histórico da fila:', error);
      throw error;
    }
  }
}