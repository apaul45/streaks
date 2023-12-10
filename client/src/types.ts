export interface BaseUser {
  username: string;
  password: string;
}

export interface User extends BaseUser {
  streak: number;
  lastSignIn: string;
  coins: number;
}

export interface UpdateResponse {
  message: string;
}
