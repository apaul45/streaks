import axios from "axios";
import { BaseUser, UpdateResponse, User } from "./types";

axios.defaults.withCredentials = true;

const backendUrl = "http://localhost:4000";

export const api = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": backendUrl,
  },
  withCredentials: true,
});

export const register = (payload: BaseUser) => api.post<User>("/user/register", payload);
export const login = (payload: BaseUser) => api.post<User>("/user/login", payload);
export const update = (username: string, payload: any) => api.put<UpdateResponse>(`/user/${username}`, { changes: payload });
export const getUser = (username: string) => api.get<User>(`/user/${username}`);

export default { register, login, update, getUser };
