import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../utils/jwt';
import { UserInterface as User, UserJwtInterface as UserJwt } from '../interfaces/User';
import { userService } from '../services/Services';

export async function authentication(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization as string;
    
    if(!token) {
      console.log('Sem token');
      console.log(token);
      res.status(401).json({ error: "Sem token"});
      return;
    }

    const userjwt = verifyJWT(token) as UserJwt;
    const user: User = await userService.findByEmail(userjwt.email);
    
    if(!user) {
      console.log('User not found');
      res.status(404).json({ error: "Usuário não encontrado"});
      return;
    }

    res.locals.user = user;
    next();
  } catch (err) {
    console.log('Token invalido');
    res.status(401).json({ error: "Token invalido ou expirado" });
  }
}