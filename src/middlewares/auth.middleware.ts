import { Response, NextFunction } from "express";
import { SECRET_KEY } from "../config";
import { DataStoredInToken, RequestWithUser } from "../interface/auth.interface";
import { verify } from "jsonwebtoken";
import { httpException } from "../exceptions/httpException";
import { UserEntity } from "../entities/users.entity";

const getAuthorization = (req: any) => {
  const coockie = req.cookies["Authorization"];
  if (coockie) return coockie;

  const header = req.header("Authorization");
  if (header) return header.split("Bearer ")[1];

  return null;
};

export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);

    if (Authorization) {
      const { id, userId } = (await verify(Authorization, String(SECRET_KEY))) as unknown as DataStoredInToken;
      const user = await UserEntity.findOne({ where: { user_id: userId, id: id } });

      if (user) {
        req.user = user;
        next();
      } else {
        next(new httpException(401, "Wrong authentication token"));
      }
    } else {
      next(new httpException(401, "Authentication token missing"));
    }
  } catch (error) {
    console.log(error);
    next(new httpException(401, "Authentication error"));
  }
};
