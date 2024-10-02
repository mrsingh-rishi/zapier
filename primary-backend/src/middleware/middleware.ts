import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

interface User {
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

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" }); // Respond with 403 (Forbidden) if token is invalid
    }

    // Attach decoded user data to the request object
    (req as AuthRequest).user = decoded as User;
    // Proceed to the next middleware/route handler
    next();
  });

  next();
};
