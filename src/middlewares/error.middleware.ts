import { NextFunction, Request, Response } from "express";
import { httpException } from "../exceptions/httpException";
import { logger } from "../utils/logger";

export const ErrorMiddleware = (error: httpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message ;

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};