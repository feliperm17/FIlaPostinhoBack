export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserInput extends Omit<IUser, 'id' | 'createdAt' | 'updatedAt'> {} 