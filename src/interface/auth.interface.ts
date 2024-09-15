import { Request } from "express";
import { User } from "./users.interface";

export interface DataStoredInToken {
  id: number;
  userId: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user?: User;
}
