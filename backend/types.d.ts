import { Model } from 'mongoose';

export interface StudioData {
  name: string;
  staff: string[];
  teams: TeamData[];
  projects: IProject[];
}

export interface StudioDataWithOwner extends StudioData {
  name: string;
  owner: string;
}

export interface TeamData {
  studioId: string;
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
  studioId: string;
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
