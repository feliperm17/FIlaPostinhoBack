import db from '../utils/db';
import { SpecialtyInterface as Specialty } from '../interfaces/Specialty';
import specialtyQueries from '../queries/specialtyQueries';

export class SpecialtyService {
  async create(specialty: Specialty) {
    try {
      const nameExists = await db.query(specialtyQueries.checkSpecialtyName, [specialty.specialty_name]);
      if (nameExists.rows.length > 0) {
        throw new Error('Especialidade já cadastrada');
      }

      const result = await db.query(specialtyQueries.addSpecialty, [specialty.specialty_name]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar especialidade:', error);
      throw error;
    }
  }

  async findAll() {
    try {
      const result = await db.query(specialtyQueries.getSpecialties);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar especialidades:', error);
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const result = await db.query(specialtyQueries.getSpecialtyById, [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao buscar especialidade:', error);
      throw error;
    }
  }

  async update(id: string, specialty: Specialty) {
    try {
      const result = await db.query(specialtyQueries.updateSpecialty, [
        specialty.specialty_name,
        id
      ]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao atualizar especialidade:', error);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const result = await db.query(specialtyQueries.deleteSpecialty, [id]);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Erro ao deletar especialidade:', error);
      throw error;
    }
  }
}