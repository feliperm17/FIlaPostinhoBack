import { Request, Response } from 'express';
import { UserInterface as User, UserJwtInterface as UserJwt } from '../interfaces/User';
import { generateJWT } from '../utils/jwt';
import { userService } from '../services/Services';

class UserController {
  async register(req: Request, res: Response) {
    try {
      const user = req.body as User;

      if (!user.username || !user.email || !user.password || !user.phone_nr || !user.cpf) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }
      user.cpf = user.cpf.replace(/\D/g, '');
      user.phone_nr = user.phone_nr.replace(/\D/g, '');
      user.account_st = 1;
      user.is_admin = false;
      const registered = await userService.register(user);

      console.log(`usuario criado: ${user.email}`);

      return res.status(201).json({
        success: true,
        user
      });
    } catch (error) {
      if (error.message === 'Email já cadastrado') {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
  }

  async registerAdmin(req: Request, res: Response) {
    try {
      const user = req.body as User;

      if (!user.username || !user.email || !user.password || !user.phone_nr || !user.cpf) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }
      user.cpf = user.cpf.replace(/\D/g, '');
      user.phone_nr = user.phone_nr.replace(/\D/g, '');
      user.account_st = 1;
      user.is_admin = true;
      const registered = await userService.register(user);

      console.log(`usuario criado: ${user.email}`);

      return res.status(201).json({
        success: true,
        user
      });
    } catch (error) {
      if (error.message === 'Email já cadastrado') {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
  }  

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        console.log(`Não logado: Sem email ou senha`);
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
      }

      const user = await userService.login(email, password);
      
      if (!user) {
        console.log(`Não logado: Credenciais invalidas`);
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      const userjwt: UserJwt = user;
      console.log(`email: ${userjwt.email}`);
      const token = generateJWT(userjwt);

      console.log(`usuario logado: ${user.email}`);


      return res.json({
        'success': true,
        user: user,
        token: token  
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao realizar login' });
    }
  }

  async findAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.findAll();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  }

  async findByUserId(req: Request, res: Response) {
    try {
      const user = await userService.findById(req.params.id);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const user = await userService.update(req.params.id, req.body);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const success = await userService.delete(req.params.id);
      if (!success) return res.status(404).json({ error: 'Usuário não encontrado' });
      return res.json({ message: 'Usuário marcado como deletado' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  }
}
export default UserController;