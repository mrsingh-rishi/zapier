import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware";

export const userRouter = Router();

userRouter.post("/signup", async (req: Request, res: Response) => {});
userRouter.post("/signin", async (req: Request, res: Response) => {});

userRouter.get(
  "/user",
  authMiddleware,
  async (req: Request, res: Response) => {}
);
