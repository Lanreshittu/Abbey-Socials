import { AppDataSource } from "../database";
import { UserEntity } from "../entities/users.entity";
import { UserService } from "../services/user.service";
import { User } from "../interface/users.interface";
import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../interface/auth.interface";

/**
 * Class representing the user controller.
 *
 * @class UserController
 */
export class UserController {
  /**
   * User service instance
   *
   * @private
   * @type {UserService}
   */
  private user: UserService;

  constructor() {
    this.user = new UserService();
  }

  /**
   * Registers a new user
   *
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {NextFunction} next Next function
   */
  public SignUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const createdUser: User = await this.user.createUser(userData);
      res.status(201).json({ status: 201, message: "user created successfully", data: createdUser });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Retrieves all users
   *
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {NextFunction} next Next function
   */
  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users: User[] = await this.user.getUsers();
      res.status(200).json({ status: 200, message: "data retrieved successfully", data: users });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Retrieves a user by id
   *
   * @param {RequestWithUser} req Request object with user
   * @param {Response} res Response object
   * @param {NextFunction} next Next function
   */
  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string | undefined = req.params.id;
      const user: User = await this.user.getUserDetails(userId);
      res.status(200).json({ status: 200, message: "data retrieved successfully", data: user });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Updates a user
   *
   * @param {RequestWithUser} req Request object with user
   * @param {Response} res Response object
   * @param {NextFunction} next Next function
   */
  public updateUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string | undefined = String(req.user?.user_id);
      const user: User | null = await this.user.updateUserDetails(userId, req.body);
      res.status(200).json({ status: 200, message: "user data updated successfully",  data: user});
    } catch (error) {
      next(error);
    }
  };

  /**
   * Deletes a user
   *
   * @param {RequestWithUser} req Request object with user
   * @param {Response} res Response object
   * @param {NextFunction} next Next function
   */
  public deleteUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string | undefined = String(req.user?.user_id);
      const user: User | null = await this.user.deleteUserDetails(userId);
      res.status(200).json({ status: 200, message: "user account deleted successfully", data: user });
    } catch (error) {
      next(error);
    }
  };
}
