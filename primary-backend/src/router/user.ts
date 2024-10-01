import { Request, Response, Router } from "express";
import { authMiddleware, AuthRequest } from "../middleware";
import { prisma } from "../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { signinSchema, signupSchema } from "../types/types";
import { JWT_SECRET } from "../config";

dotenv.config();

export const userRouter = Router();

userRouter.post(
  "/signup",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { success } = signupSchema.safeParse(req.body);

      if (!success) {
        return res.status(400).json({ message: "Invalid input" });
      }

      const { email, password, name } = req.body;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      console.log("Existing User", existingUser);
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: { email, password: hashedPassword, name },
      });
      // TODO: add the email verification logic =sent out an email verification mail to user's email address
      // And remove the token from the response
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      return res
        .status(201)
        .json({ message: "User created successfully", user, token });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
);
userRouter.post(
  "/signin",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { success } = signinSchema.safeParse(req.body);
      if (!success) return res.status(400).json({ message: "Invalid Inputs" });

      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      return res
        .status(201)
        .json({ message: "Login Successfully", user, token });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
);

userRouter.get(
  "/user",
  authMiddleware, // No need for @ts-ignore
  async (req: Request, res: Response): Promise<any> => {
    try {
      // Type assertion to cast `req` to `AuthRequest`
      const userId = (req as AuthRequest).user.id;
      const user = await prisma.user.findUnique({
        where: { id: Number(userId) },
        select: {
          email: true,
          name: true,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ user });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
);
