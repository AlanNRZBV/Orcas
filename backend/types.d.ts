import { Model } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  displayName: string;
  avatar: string | null;
}

export interface UserFields {
  email: string;
  firstName: string;
  secondName: string;
  middleName: string;
  password: string;
  token: string;
  role: string;
  googleID: string;
  avatar: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserField, object, UserMethods>;
