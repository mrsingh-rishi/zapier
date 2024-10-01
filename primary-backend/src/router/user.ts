import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware";
import { prisma } from "../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { signinSchema, signupSchema } from "../types/types";

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

      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: { email, password: hashedPassword, name },
      });

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || "secret",
        {
          expiresIn: "1h",
        }
      );

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

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || "secret",
        {
          expiresIn: "1h",
        }
      );

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
  authMiddleware,
  async (req: Request, res: Response) => {}
);
