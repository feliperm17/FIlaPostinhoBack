import { Request, Response, NextFunction } from 'express';
import { UserInterface as User, UserJwtInterface as UserJwt } from '../interfaces/User';

export function checkPermissions(AdminPermission: boolean){
  return (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user as User;

    if(!user){
      res.status(401).json({ error: "Acesso negado: Usuário não encontrado." });
      return;
    }

    if(AdminPermission === true && user.account_st != 1){
      res.status(401).json({ error: "Acesso negado: Permissões insuficientes." });
      return;
    }

    next();
  }


}