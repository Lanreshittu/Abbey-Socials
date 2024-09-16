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
  /**
   * Initializes the auth service with the user entity and the data source manager
   */
  public auth = new AuthService();

  /**
   * Logs in a user and returns a cookie and the user details.
   * @param req The request object
   * @param res The response object
   * @param next The next function
   * @returns A promise that resolves to a response object with a user and a cookie
   */
  public Login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;
      /**
       * Login the user and get the user and a cookie
       * @param userData The user data
       * @returns A promise that resolves to a login result
       */
      const { cookie, findUser, accessData } = await this.auth.login(userData);
      /**
       * Set the cookie in the response
       * @param key The key of the cookie
       * @param value The value of the cookie
       */
      res.setHeader('Set-Cookie', [`${cookie}; SameSite=None; Secure; HttpOnly`]);
      /**
       * Return a response with the user and the cookie
       */
      res.status(200).json({ status: 200, message: "login successful", data: findUser, token: accessData });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Refreshes a user's token
   * @param req The request object
   * @param res The response object
   * @param next The next function
   * @returns A promise that resolves to a response object with a new cookie
   */
  public refresh = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.cookies['Authorization']
      /**
       * Refresh the user's token
       * @param token The token
       * @returns A promise that resolves to a refresh result
       */
      const refreshData = await this.auth.refreshToken(token);
      /**
       * Return a response with the new cookie
       */
      res.status(200).json({ data: refreshData.cookie, message: 'refresh' });
    } catch (error) {
      next(error);
    }
  };
}
