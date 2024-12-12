import express from 'express';
import cors from 'cors';
import routes from './routes/userRoutes';
import pool from './db';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    this.database();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private routes(): void {
    this.express.use(routes);
  }

  private async database(): Promise<void> {
    try {
      await pool.query('SELECT NOW()');
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}

export default new App().express;