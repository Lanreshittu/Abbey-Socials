import { AppDataSource } from "../database";
import { AuthService } from "../services/auth.service";
import { UserEntity } from "../entities/users.entity";
import { Request, Response, NextFunction } from "express";
import { User } from "../interface/users.interface";

/**
 * Handles user authentication
 * @class AuthController
 */
export class AuthController {
  public  auth = new AuthService();

  /**
   * Logs in a user and returns a cookie and user details
   * @param req Request object
   * @param res Response object
   * @param next NextFunction object
   * @returns A JSON response with status, message, data and token
   */
  public Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get user data from request body
      const userData: User = req.body;

      // Login user and get user and cookie
      const { cookie, findUser } = await this.auth.login(userData);

      // Return response with user and cookie
      res.status(200).json({
        status: 200,
        message: "login successful",
        data: findUser,
        token: cookie
      });
    } catch (error) {
      // Call next function with error
      next(error);
    }
  };
}
