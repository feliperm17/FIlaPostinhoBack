import { Pool } from 'pg';
import userQueries from '../queries/userQueries'
import dotenv from 'dotenv';
dotenv.config();

export class UserService {
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

  async create(user: { 
    username: string; 
    phone_nr: string; 
    email: string; 
    cpf: string; 
    account_st: number;
    password: string;
  }) {
    try {
      const { username, phone_nr, email, cpf, account_st, password } = user;
      const password_hash = password; // Por enquanto, sem hash para testar

      const result = await this.db.query(
        userQueries.addUser, 
        [username, phone_nr, email, cpf, account_st, password_hash]
      );
      
      return result.rows[0];
    } catch (error) {
      console.error('Erro no UserService.create:', error);
      throw error;
    }
  }

  async findAll() {
    const result = await this.db.query(userQueries.getUsers);
    return result.rows;
  }

  async findById(id: string) {
    const result = await this.db.query(userQueries.getUserById, [id]);
    return result.rows[0];
  }

  async update(id: string, user: { 
    username: string; 
    phone_nr: string; 
    email: string; 
    cpf: string; 
    account_st: number;
  }) {
    try {
      const { username, phone_nr, email, cpf, account_st } = user;
      const result = await this.db.query(
        userQueries.updateUser, 
        [username, phone_nr, email, cpf, account_st, id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Erro no UserService.update:', error);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const result = await this.db.query(userQueries.deleteUser, [id]);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Erro no UserService.delete:', error);
      throw error;
    }
  }
}