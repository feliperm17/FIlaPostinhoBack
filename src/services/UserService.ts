import { Pool } from 'pg';
import userQueries from '../queries/queries'
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
      port: parseInt(process.env.PGPORT),
    }); 
  }

  async create(user: { username: string; phone_nr: string; email: string; cpf: string; user_st: string }) {
    const { username, phone_nr, email, cpf, user_st } = user;
    console.log("a");
    const result = await this.db.query(userQueries.addUser, [username, phone_nr, email, cpf, user_st]);
    console.log("b");
    return result.rows[0];
  }

  async findAll() {
    const result = await this.db.query(userQueries.getUsers);
    return result.rows;
  }

  async findById(id: string) {
    const result = await this.db.query(userQueries.getUserById, [id]);
    return result.rows[0];
  }

  async update(id: string, user: { username: string; phone_nr: string; email: string; cpf: string; user_st: string }) {
    const { username, phone_nr, email, cpf, user_st } = user;
    const result = await this.db.query(userQueries.updateUser, [username, phone_nr, email, cpf, user_st, id]);
    return result.rowCount > 0 ? result.rows[0] : null;
  }

  async delete(id: string) {
    const result = await this.db.query(userQueries.deleteUser, [id]);
    return result.rowCount > 0;
  }
}