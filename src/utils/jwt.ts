import jwt from 'jsonwebtoken';
import { UserJwtInterface as UserJwt} from '../interfaces/User';

const jwt_key = process.env.JWTKEY || 'secret_key';

export function generateJWT(user: UserJwt){
  const token = jwt.sign(
    { email: user.email },
    jwt_key,                       
    { expiresIn: '1h' }               
  );
  return token;
}

export function verifyJWT(token: string): UserJwt {
  console.log(token)
  try{
    const user = jwt.verify(token, jwt_key) as UserJwt;
    return user;
  } catch (err) {
    throw err;
  }
}
