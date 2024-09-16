import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

/**
 * Handles all routes related to authentication
 */
export class AuthRoute {
    /**
     * The express router
     */
    public router = Router();
    /**
     * The auth controller
     */
    public auth = new AuthController();

    /**
     * Initialize the routes
     */
    constructor() {
        this.initializeRoutes();
    }

    /**
     * Initialize the routes
     */
    private initializeRoutes() {
        this.router.post("/login", this.auth.Login);
        this.router.get("/refresh", this.auth.refresh);
    }
}

