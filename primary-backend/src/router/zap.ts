import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware";

export const zapRouter = Router();

zapRouter.post("/", authMiddleware, async (req: Request, res: Response) => {});
zapRouter.get("/", authMiddleware, async (req: Request, res: Response) => {});
zapRouter.get(
  "/:zapId",
  authMiddleware,
  async (req: Request, res: Response) => {}
);
