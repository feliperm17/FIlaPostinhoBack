import db from '../utils/db';
import {UserInterface as User, UserJwtInterface as UserJwt} from '../interfaces/User';
import bcrypt from 'bcrypt';
import userQueries from '../queries/userQueries';
import dotenv from 'dotenv';
dotenv.config();

export class UserService {
  async register(user: User) {
    try {
      // Verificar se o email já existe
      const emailExists = await db.query(userQueries.checkEmail, [user.email]);
      if (emailExists.rows.length > 0) {
        throw new Error('Email já cadastrado');
      } 

      // Hash da senha
      const password_hash = await bcrypt.hash(user.password, 10);

      const result = await db.query(
        userQueries.addUser, 
        [user.username, user.phone_nr, user.email, user.cpf, user.account_st, user.is_admin, password_hash]
      );
      
      // Não retornar a senha no resultado
      const { password_hash: _, ...userWithoutPassword } = result.rows[0];
      return userWithoutPassword;
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  }

  async registerAdmin(user: User) {
    try {
      // Verificar se o email já existe
      const emailExists = await db.query(userQueries.checkEmail, [user.email]);
      if (emailExists.rows.length > 0) {
        throw new Error('Email já cadastrado');
      }

      // Hash da senha
      const password_hash = await bcrypt.hash(user.password, 10);

      const result = await db.query(
        userQueries.addUser, 
        [user.username, user.phone_nr, user.email, user.cpf, user.account_st, user.is_admin, password_hash]
      );
      
      // Não retornar a senha no resultado
      const { password_hash: _, ...userWithoutPassword } = result.rows[0];
      return userWithoutPassword;
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const result = await db.query(userQueries.getUserByEmail, [email]);
      const user = result.rows[0];

      if (!user) {
        return null;
      }

      const isValidPassword = await bcrypt.compare(password, user.password_hash);

      if (!isValidPassword) {
        return null;
      }

      // Não retorne a senha no resultado
      const { password_hash, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  async findAll() {
    const result = await db.query(userQueries.getUsers);
    return result.rows;
  }

  async findById(id: string) {
    const result = await db.query(userQueries.getUserById, [id]);
    return result.rows[0];
  }

  async update(id: string, user: User) {
    try {
      const { username, phone_nr, email, cpf, account_st, is_admin } = user;
      const result = await db.query(
        userQueries.updateUser, 
        [username, phone_nr, email, cpf, account_st, is_admin, id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Erro no UserService.update:', error);
      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      const result = await db.query(
        userQueries.checkEmail,
        [email]
      );
      const user: User = await result.rows[0];
      return user;
    } catch (error) {
      console.error('Erro no UserService.findByEmail: ', error);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const result = await db.query(userQueries.deleteUser, [id]);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Erro no UserService.delete:', error);
      throw error;
    }
  }
}