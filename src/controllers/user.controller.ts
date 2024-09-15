import { AppDataSource } from "../database";
import { UserEntity } from "../entities/users.entity";
import { UserService } from "../services/user.service";
import { User } from "../interface/users.interface";
import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../interface/auth.interface";

export class UserController {
  public user = new UserService(UserEntity, AppDataSource.manager);

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users: User[] = await this.user.getUsers();
      res.status(200).json({ data: users, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string | undefined = String(req.user?.user_id);
      const user: User = await this.user.getUserDetails(userId);
      res.status(200).json({ data: user, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string | undefined = String(req.user?.user_id);
      const user: User | null = await this.user.updateUserDetails(userId, req.body);
      res.status(200).json({ data: user, message: "update" });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: User | null = await this.user.deleteUserDetails(req.params.id);
      res.status(200).json({ data: user, message: "delete" });
    } catch (error) {
      next(error);
    }
  };
}
