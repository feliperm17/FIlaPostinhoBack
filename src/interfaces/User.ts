
export interface UserInterface {
  id ?: number;
  username: string; 
  phone_nr: string; 
  email: string; 
  cpf: string; 
  account_st: number;
  is_admin ?: boolean;
  password ?: string;
}

export interface UserJwtInterface {
  email: string;
  is_admin: boolean;
}