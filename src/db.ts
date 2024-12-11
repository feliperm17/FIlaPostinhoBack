import dotenv from 'dotenv';
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
dotenv.config();

const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: parseInt(process.env.PGPORT),
});

const runScript = async (filepath: string) => {
    const script = fs.readFileSync(path.join(__dirname,filepath)).toString();
    try{
        await pool.query(script);
    }catch(error){
        console.error("Erro ao criar o Banco de Dados: ", error.message);
    }
};

runScript("./scripts/create_db.sql");

export default pool;