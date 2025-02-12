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
    const x = token.split(' ')[1]
    console.log("bah")
    console.log(x);
    const user = jwt.verify(x, jwt_key) as UserJwt;
    console.log(user);
    return user;
  } catch (err) {
    console.log("Erro JWT.verifyJWT")
    throw err;
  }
}
