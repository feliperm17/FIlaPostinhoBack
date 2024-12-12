import pool from '../db';
import bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/User';

export class User {
  static async create(userData: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<Partial<IUser>> {
    const { name, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at as "createdAt"
    `;

    const result = await pool.query(query, [name, email, hashedPassword]);
    return result.rows[0];
  }

  static async findByEmail(email: string): Promise<IUser | null> {
    const query = `
      SELECT *
      FROM users
      WHERE email = $1
    `;

    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  }

  static async findById(id: number): Promise<Partial<IUser> | null> {
    const query = `
      SELECT id, name, email, created_at as "createdAt"
      FROM users
      WHERE id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async update(id: number, userData: Partial<IUser>): Promise<Partial<IUser> | null> {
    const { name, email, password } = userData;
    let hashedPassword = password;
    
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const query = `
      UPDATE users
      SET 
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        password = COALESCE($3, password),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING id, name, email, created_at as "createdAt", updated_at as "updatedAt"
    `;

    const result = await pool.query(query, [name, email, hashedPassword, id]);
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const query = `
      DELETE FROM users
      WHERE id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rowCount > 0;
  }
}

export default User; 