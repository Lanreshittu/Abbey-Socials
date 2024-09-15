import { AppDataSource } from "../database";
import { AuthService } from "../services/auth.service";
import { UserEntity } from "../entities/users.entity";
import { Request, Response, NextFunction } from "express";
import { User } from "../interface/users.interface";

export class AuthController {
  public auth = new AuthService(UserEntity, AppDataSource.manager);

  public SignUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const createdUser: User = await this.auth.createUser(userData);
      res.status(201).json({ data: createdUser, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const { cookie, findUser } = await this.auth.login(userData);
      res.status(200).json({ data: findUser, token: cookie, message: "login" });
    } catch (error) {
      next(error);
    }
  };
}
