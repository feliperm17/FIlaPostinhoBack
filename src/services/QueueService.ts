import { Pool } from 'pg';
import dotenv from 'dotenv';
import queueQueries from '../queries/queueQueries';
dotenv.config();

export class QueueService {
  private db: Pool;

  constructor() {
    this.db = new Pool({
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      port: parseInt(process.env.PGPORT || '5433'),
    }); 
  }

  async create(queue: { 
    specialty: number; 
    queue_dt: Date; 
    position_nr : number; 
    queue_size : number; 
  }) {
    try {
      const { specialty, queue_size } = queue;
      const queue_dt = new Date()
      const position_nr = 0

      const result = await this.db.query(
        queueQueries.addQueue, 
        [specialty, queue_dt, position_nr, queue_size]
      );
      
      return result.rows[0];
    } catch (error) {
      console.error('Erro no QueueService.create:', error);
      throw error;
    }
  }
}