import { Router } from "express";
import { RelationshipController } from "../controllers/relationship.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

/**
 * Handles all routes related to relationships
 *
 * @class RelationshipRoute
 */
export class RelationshipRoute {
    /**
     * Express router
     *
     * @type {Router}
     * @memberof RelationshipRoute
     */
    public router = Router();

    /**
     * Relationship controller
     *
     * @type {RelationshipController}
     * @memberof RelationshipRoute
     */
    public relationship = new RelationshipController();

    /**
     * Initializes the routes
     *
     * @memberof RelationshipRoute
     */
    constructor() {
        this.initializeRoutes();
    }

    /**
     * Initializes the routes
     *
     * @memberof RelationshipRoute
     */
    private initializeRoutes() {
        this.router.post("/follow/:id", AuthMiddleware, this.relationship.followUser);
        this.router.post("/unfollow/:id", AuthMiddleware, this.relationship.unfollowUser);
        this.router.get("/relationships/:id", AuthMiddleware, this.relationship.getRelationships);
        this.router.get("/isFollowing/:id", AuthMiddleware, this.relationship.isFollowing);
    }
}
