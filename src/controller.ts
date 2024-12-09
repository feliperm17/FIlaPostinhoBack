import { Request, Response } from 'express';
import pool from './db';
import queries from './queries';
import { error } from 'console';

const getUsuarios = (req: Request, res: Response): void => {
    pool.query(queries.getUsuarios, (error, results) => {
        if (error) {
            console.error('Erro ao buscar usuários:', error);
            res.status(500).json({
                mensagem: 'Erro interno do servidor',
                erro: error.message
            });
            return;
        }
        
        if (results.rows.length === 0) {
            res.status(404).json({ mensagem: 'Nenhum usuário encontrado' });
            return;
        }
        
        res.status(200).json(results.rows);
    });
};

export { 
    getUsuarios 
};