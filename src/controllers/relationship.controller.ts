import { AppDataSource } from "../database";
import { RelationshipEntity } from "../entities/relationship.entity";
import { RelationshipService } from "../services/relationship.service";
import { Request, Response, NextFunction } from "express";
import { Relationship } from "../interface/relationship.interface";
import { RequestWithUser } from "../interface/auth.interface";

/**
 * Handles all operations related to relationships
 */
export class RelationshipController {
  private relationshipService = new RelationshipService(RelationshipEntity, AppDataSource.manager);

  /**
   * Follows a user
   * @param req Request with user data
   * @param res Response with the created relationship
   * @param next Next function to call if an error occurs
   */
  public followUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string | undefined = String(req.user?.user_id);
      const relationship: Relationship = { user_id: userId, friend_id: req.params.id };
      const createdRelationship: Relationship = await this.relationshipService.followUser(relationship);
      res.status(201).json({
        status: 201,
        message: "User followed successfully",
        data: createdRelationship
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Unfollows a user
   * @param req Request with user data
   * @param res Response with the deleted relationship
   * @param next Next function to call if an error occurs
   */
  public unfollowUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string | undefined = String(req.user?.user_id);
      const relationship: Relationship = { user_id: userId, friend_id: req.params.id };
      const deletedRelationship: Relationship = await this.relationshipService.unfollowUser(relationship);
      res.status(200).json({
        status: 200,
        message: "User unfollowed",
        data: deletedRelationship
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Returns all the relationships of a user
   * @param req Request with user data
   * @param res Response with the relationships of the user
   * @param next Next function to call if an error occurs
   */
  public getRelationships = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string | undefined =  req.params.id;
      const type = req.query.type as "followers" | "following" | "friends";
      const relationships: Relationship[] = await this.relationshipService.getRelationships(userId, type);
      res.status(200).json({
        status: 200,
        message: "User relationships",
        data: relationships
      });
    } catch (error) {
      next(error);
    }
  };

  public isFollowing = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string | undefined = String(req.user?.user_id);
      const friend_id: string = req.params.id;
      const isFollowing: boolean = await this.relationshipService.isFollowing(userId, friend_id);
      res.status(200).json({ status: 200, message: "User is following", data: isFollowing });
    } catch (error) {
      next(error);
    }
  };
}
