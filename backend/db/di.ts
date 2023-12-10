import { MongoDbManager } from "./mongodb/manager";
import dotenv from "dotenv";

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
  updateUser(username: string, body: any): Promise<void>;
}

dotenv.config();
const { MONGODB_CONNECTION } = process.env;

export const dbManager: DbManager = new MongoDbManager(
  MONGODB_CONNECTION as string
);
