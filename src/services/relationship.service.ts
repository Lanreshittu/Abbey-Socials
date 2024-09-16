import { Repository } from "typeorm";
import { RelationshipEntity } from "../entities/relationship.entity";
import { Relationship } from "../interface/relationship.interface";


/**
 * This class is responsible for all operations related to relationships.
 */
export class RelationshipService extends Repository<RelationshipEntity> {

    /**
     * This method creates a new relationship between two users.
     * @param relationship Relationship data
     * @returns The newly created relationship
     */
    public async followUser(relationship: Relationship): Promise<Relationship> {
        // If the relationship already exists, return the existing one
        const existingRelationship = await this.findOne({
            where: {
                user_id: relationship.user_id,
                friend_id: relationship.friend_id
            }
        });
        if (existingRelationship) {
            return existingRelationship;
        }

        // Create a new relationship
        return this.create(relationship).save();
    }

    /**
     * This method deletes a relationship between two users.
     * @param relationship Relationship data
     * @returns The deleted relationship
     */
    public async unfollowUser(relationship: Relationship): Promise<Relationship> {
        const deletedRelationship = await this.delete({
            user_id: relationship.user_id,
            friend_id: relationship.friend_id
        });
        return deletedRelationship.raw;
    }

    /**
     * This method returns the relationships of a user.
     * @param userId User id
     * @param type Type of relationship to return. Can be 'followers', 'following', or 'mutual'
     * @returns An array of relationships
     */
    public async getRelationships(userId: string, type: string): Promise<Relationship[]> {
        const query = type === 'followers' ?
            `SELECT u.user_id, u.first_name, u.last_name FROM public.user_entity u
            JOIN public.relationship_entity r ON u.user_id = r.user_id
            WHERE r.friend_id = $1`
        :
            type === 'following' ?
            `SELECT u.user_id, u.first_name, u.last_name FROM public.user_entity u
            JOIN public.relationship_entity r ON u.user_id = r.friend_id
            WHERE r.user_id = $1`
        :
            `SELECT u.user_id, u.first_name, u.last_name FROM public.user_entity u
            WHERE u.user_id IN (
                SELECT r1.friend_id FROM public.relationship_entity r1
                JOIN public.relationship_entity r2 ON r1.friend_id = r2.user_id
                WHERE r1.user_id = $1 AND r2.friend_id = $1
            )`;

        const relationships = await this.query(query, [userId]);
        return relationships;
    }
}

