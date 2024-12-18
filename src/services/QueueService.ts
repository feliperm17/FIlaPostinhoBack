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
      return parseInt(result.rows[0].total);
    } catch (error) {
      console.error('Erro no QueueService.getCurrentQueueSize:', error);
      throw error;
    }
  }

  async getUserPosition(queueId: string, userId: string) {
    try {
      const result = await db.query(queueQueries.getUserPosition, [queueId, userId]);
      return result.rows[0]?.position;
    } catch (error) {
      console.error('Erro no QueueService.getUserPosition:', error);
      throw error;
    }
  }
}