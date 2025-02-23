import { Request, Response } from 'express';
import { SpecialtyInterface as Specialty } from '../interfaces/Specialty';
import { SpecialtyService } from '../services/SpecialtyService';

class SpecialtyController {
  private specialtyService = new SpecialtyService();

  async create(req: Request, res: Response) {
    try {
      const specialty = req.body as Specialty;

      if (!specialty.specialty_name) {
        return res.status(400).json({ error: 'Nome da especialidade é obrigatório' });
      }

      const created = await this.specialtyService.create(specialty);
      return res.status(201).json(created);
    } catch (error) {
      if (error.message === 'Especialidade já cadastrada') {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro ao criar especialidade' });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const specialties = await this.specialtyService.findAll();
      return res.json(specialties);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar especialidades' });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const specialty = await this.specialtyService.findById(req.params.id);
      if (!specialty) return res.status(404).json({ error: 'Especialidade não encontrada' });
      return res.json(specialty);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar especialidade' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const specialty = await this.specialtyService.update(req.params.id, req.body);
      if (!specialty) return res.status(404).json({ error: 'Especialidade não encontrada' });
      return res.json(specialty);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar especialidade' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const success = await this.specialtyService.delete(req.params.id);
      if (!success) return res.status(404).json({ error: 'Especialidade não encontrada' });
      return res.json({ message: 'Especialidade deletada com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar especialidade' });
    }
  }
}

export default SpecialtyController