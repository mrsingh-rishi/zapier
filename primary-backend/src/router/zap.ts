import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware";

export const zapRouter = Router();

zapRouter.post("/", async (req: Request, res: Response) => {});
zapRouter.get("/", async (req: Request, res: Response) => {});
