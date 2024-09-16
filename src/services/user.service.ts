
import { UserEntity } from "../entities/users.entity";
import { User } from "../interface/users.interface";
import { AppDataSource } from "../database";
import { httpException } from "../exceptions/httpException";
import { hash } from "bcrypt";

/**
 * This class is responsible for all database operations related to users.
 */
export class UserService {
  /**
   * This method creates a new user in the database.
   * @param userData User data
   * @returns The newly created user
   */
  public async createUser(userData: User): Promise<User> {
    // Check if the email already exists in the database
    const findUser: User[] = await AppDataSource.query(`SELECT email from user_entity WHERE email = $1`, [userData.email]);
    if (findUser.length) throw new httpException(409, `This email ${userData.email} already exists`);

    // Hash the password
    const hashedPassword = await hash(userData.password, 10);

    // Insert the user into the database and return the created user
    const query = `INSERT INTO public.user_entity(
            user_id, first_name, last_name, email, password, phone_number, location)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const createdUser: User[] = await AppDataSource.query(query, [
      userData.first_name.toLowerCase() + userData.last_name.toLowerCase() +  Math.floor(1 + Math.random() * 10000),
      userData.first_name,
      userData.last_name,
      userData.email,
      hashedPassword,
      userData.phone_number,
      userData.location,
    ]);
    return createdUser[0];
  }

  /**
   * This method returns all users from the database.
   * @returns An array of users
   */
  public async getUsers(): Promise<User[]> {
    return await AppDataSource.query(`SELECT * from user_entity`);
  }

  /**
   * This method returns a user from the database based on the user id.
   * @param userId User id
   * @returns The user with the given id
   */
  public async getUserDetails(userId: string): Promise<User> {
    const query = `SELECT * from user_entity WHERE user_id = $1`;
    const user: User[] = await AppDataSource.query(query, [userId]);

    return user[0];
  }

  /**
   * This method updates a user in the database.
   * @param userId User id
   * @param userData User data
   * @returns The updated user
   */
  public async updateUserDetails(userId: string, userData: User): Promise<User | null> {
    const findUser: User | null = await UserEntity.findOne({ where: { user_id: userId } });
    if (!findUser) throw new httpException(409, "User not found");

    if (userData.password) {
      // Hash the password
      const hashedPassword = await hash(userData.password, 10);
      userData.password = hashedPassword;
    }

    // Update the user in the database
    await UserEntity.update({ user_id: userId }, userData);
    const updatedUser: User | null = await UserEntity.findOne({ where: { user_id: userId } });
    return updatedUser;
  }

  /**
   * This method deletes a user from the database.
   * @param userId User id
   * @returns The deleted user
   */
  public async deleteUserDetails(userId: string): Promise<User | null> {
    const deleteUser: User[] = await AppDataSource.query(`DELETE from user_entity WHERE user_id = $1 RETURNING *`, [userId]);
    if (!deleteUser.length) throw new httpException(409, "User not found");
    return deleteUser[0];
  }
}
