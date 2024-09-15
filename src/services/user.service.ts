import { Repository } from "typeorm";
import { UserEntity } from "../entities/users.entity";
import { User } from "../interface/users.interface";
import { AppDataSource } from "../database";
import { httpException } from "../exceptions/httpException";

export class UserService extends Repository<UserEntity> {
  public async getUsers(): Promise<User[]> {
    return await AppDataSource.query(`SELECT * from user_entity`);
  }

  public async getUserDetails(userId: string): Promise<User> {
    const query = `SELECT * from user_entity WHERE user_id = $1`;
    const user: User[] = await AppDataSource.query(query, [userId]);

    return user[0];
  }

  public async updateUserDetails(userId: string, userData: User): Promise<User | null> {
    const findUser: User | null = await UserEntity.findOne({ where: { user_id: userId } });
    if (!findUser) throw new httpException(409, "User not found");

    await UserEntity.update({ user_id: userId }, userData);
    const updatedUser: User | null = await UserEntity.findOne({ where: { user_id: userId } });
    return updatedUser;
  }

  public async deleteUserDetails(userId: string): Promise<User | null> {
    const deleteUser: User[] = await AppDataSource.query(`DELETE from user_entity WHERE user_id = $1 RETURNING *`, [userId]);
    if (!deleteUser.length) throw new httpException(409, "User not found");
    return deleteUser[0];
  }
}
