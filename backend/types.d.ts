import { Model } from 'mongoose';

export interface StudioData {
  name: string;
  owner: string;
  staff: string[];
  teams: Team[];
  projects: IProject[];
}

export interface Team {
  name: string;
  members: TeamMember[];
}
export interface TeamMember {
  userId: string;
  teamRole: string;
}

export interface IProject {
  name: string;
  team: Team;
}
export interface ProjectData {
  name: string;
  team: TeamMember[];
  expireAt: string;
}

export interface IUser {
  email: string;
  password: string;
  avatar: string | null;
  firstName: string;
  lastName: string;
}

export interface UserFields {
  email: string;
  firstName: string;
  lastName: string;
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

type UserModel = Model<UserFields, object, UserMethods>;
