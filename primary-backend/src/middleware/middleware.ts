import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export interface User {
  id: string;
  email: string;
}

export interface AuthRequest extends Request {
  user: User;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  // Get the token from the Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract the token from "Bearer <token>"

  // If there's no token, respond with 401 (Unauthorized)
  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  }

  const user = jwt.verify(token as string, JWT_SECRET) as User;

  (req as AuthRequest).user = user;

  next();
};
