
export interface UserInterface {
  id ?: number;
  username: string; 
  phone_nr: string; 
  email: string; 
  cpf: string; 
  account_st: number;
  admin_permission: boolean;
  password ?: string;
}

export interface UserJwtInterface {
  email: string;
}