import { MongoDbManager } from "./mongodb/manager";

export interface User {
  username: string;
  passwordHash?: string;
  streak: number;
  lastSignIn: Date;
  coins: number;
}

export interface DbManager {
  registerUser(username: string, password: string): Promise<User | null>;
  getUser(username: string): Promise<User | null>;
  updateUser(username: string, body: any);
}

export const dbManager: DbManager = new MongoDbManager();
