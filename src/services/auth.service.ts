import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { DataStoredInToken, TokenData } from "../interface/auth.interface";
import { User } from "../interface/users.interface";
import { AppDataSource } from "../database";
import { httpException } from "../exceptions/httpException";
import { compare } from "bcrypt";
import { UserEntity } from "../entities/users.entity";

const createToken = (user: User, expiresIn: number = 12 * 60 * 60): TokenData => {
  const secretKey = SECRET_KEY as string;
  const dataStoredInToken: DataStoredInToken = { userId: user.user_id };

  return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn, algorithm: 'HS256' }) };
};

const createCookie = (tokenData: TokenData): string => {
  return `${tokenData.token}`;
};

/**
 * This class is responsible for all authentication operations.
 */
export class AuthService {

  private readonly userRepository = AppDataSource.getRepository(UserEntity);

  /**
   * This method logs in a user and returns a cookie and the user details.
   * @param userData User data
   * @returns A cookie and the user details
   */
  public async login(userData: User): Promise<{ cookie: string; findUser: User }> {
    // Find the user in the database
    const findUser = await this.userRepository.findOneBy({ email: userData.email });
    if (!findUser) {
      // If the user is not found, throw an exception
      throw new httpException(409, `This email ${userData.email} was not found`);
    }

    // Compare the provided password with the stored password
    const isPasswordMatching = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) {
      // If the passwords do not match, throw an exception
      throw new httpException(409, "Invalid Details");
    }

    // Create a token for the user
    const tokenData = createToken(findUser);
    // Create a cookie from the token
    const cookie = createCookie(tokenData);
    // Return the cookie and the user details
    return { cookie, findUser };
  }
}
