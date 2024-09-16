import { UserController } from "../controllers/user.controller";
import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";

/**
 * Handles all routes related to users
 */
export class UserRoute {
  /**
   * The base path for all user routes
   */
  public path = "/users";

  /**
   * The express router
   */
  public router = Router();

  /**
   * The user controller
   */
  public user = new UserController();

  /**
   * Initializes the routes
   */
  constructor() {
    this.initializeRoutes();
  }

  /**
   * Initializes the routes
   */
  private initializeRoutes() {
    // Create a new user
    this.router.post(`${this.path}/signup`, this.user.SignUp);

    // Get all users
    this.router.get(`${this.path}`, AuthMiddleware, this.user.getUsers);

    // Get a user with the given id
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.user.getUserById);

    // Update a user with the given id
    this.router.put(`${this.path}`, AuthMiddleware, this.user.updateUser);

    // Delete a user with the given id
    this.router.delete(`${this.path}`, AuthMiddleware, this.user.deleteUser);
  }
}
