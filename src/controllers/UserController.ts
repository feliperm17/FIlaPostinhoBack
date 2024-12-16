import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async register(req: Request, res: Response) {
    try {
      const { username, email, password, phone_nr, cpf } = req.body;

      if (!username || !email || !password || !phone_nr || !cpf) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }
      const cpf_novo : string = cpf.replace(/\D/g, '');
      const phone_novo : string = phone_nr.replace(/\D/g, '');

      const user = await this.userService.create({
        username,
        email,
        password,
        phone_nr: phone_novo,
        cpf: cpf_novo,
        account_st: 1 // 1 para conta ativa
      });

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

      const user = await this.userService.login(email, password);
      
      if (!user) {
        console.log(`Não logado: Credenciais invalidas`);
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      console.log(`usuario logado: ${user.email}`);

      return res.json({
         'success': true,
         user: user 
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao realizar login' });
    }
  }

  async findAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.findAll();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  }

  async findByUserId(req: Request, res: Response) {
    try {
      const user = await this.userService.findById(req.params.id);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const user = await this.userService.update(req.params.id, req.body);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const success = await this.userService.delete(req.params.id);
      if (!success) return res.status(404).json({ error: 'Usuário não encontrado' });
      return res.json({ message: 'Usuário marcado como deletado' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  }
}
export default UserController;