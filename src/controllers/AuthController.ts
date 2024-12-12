import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db';
import authQueries from '../queries/authQueries';
import { IUserInput } from '../interfaces/User';

class AuthController {
    async register(req: Request, res: Response): Promise<Response> {
        try {
            const { email, name, password }: IUserInput = req.body;

            // Verifica se o usuário já existe
            const userExists = await pool.query(authQueries.getUserByEmail, [email]);
            if (userExists.rows.length > 0) {
                return res.status(400).json({ error: 'Usuário já existe' });
            }

            // Hash da senha
            const hashedPassword = await bcrypt.hash(password, 10);

            // Cria o usuário
            const result = await pool.query(authQueries.createUser, [
                name,
                email,
                hashedPassword
            ]);

            const user = result.rows[0];

            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET || 'default_secret',
                {
                    expiresIn: '7d',
                }
            );

            return res.status(201).json({
                user,
                token
            });

        } catch (err) {
            console.error(err);
            return res.status(400).json({ error: 'Falha no registro' });
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password }: Pick<IUserInput, 'email' | 'password'> = req.body;

            // Busca o usuário
            const result = await pool.query(authQueries.getUserByEmail, [email]);
            const user = result.rows[0];

            if (!user) {
                return res.status(400).json({ error: 'Usuário não encontrado' });
            }

            // Verifica a senha
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(400).json({ error: 'Senha inválida' });
            }

            // Remove a senha do objeto de retorno
            const { password: _, ...userWithoutPassword } = user;

            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET || 'default_secret',
                {
                    expiresIn: '7d',
                }
            );

            return res.json({
                user: userWithoutPassword,
                token
            });

        } catch (err) {
            console.error(err);
            return res.status(400).json({ error: 'Falha no login' });
        }
    }
}

export default new AuthController(); 