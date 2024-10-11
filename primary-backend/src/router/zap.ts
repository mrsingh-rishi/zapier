import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/middleware";
import { zapierCreateSchema } from "../types/types";
import { prisma } from "../db/db";

export const zapRouter = Router();

zapRouter.post(
  "/",
  authMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { success } = zapierCreateSchema.safeParse(req.body);
      if (!success) {
        return res.status(400).json({ error: "Invalid request body" });
      }
      const { availableTriggerId, triggerMetadata, actions } = req.body;
      await prisma.$transaction(async (tx) => {
        const zap = await tx.zap.create({
          data: {
            // @ts-ignore
            userId: req.user.id,
            triggerId: "",
            actions: actions.map((action: any, index: number) => ({
              actionId: action.availableActionId,
              sortingOrder: index,
            })),
          },
        });

        const trigger = await tx.trigger.create({
          data: {
            zapId: zap.id,
            triggerId: availableTriggerId,
          },
        });

        await tx.zap.update({
          where: {
            id: zap.id,
          },
          data: {
            triggerId: trigger.id,
          },
        });
      });
    } catch (error: any) {
      return res.status(500).json({ error: error, message: error.message });
    }
  }
);
zapRouter.get(
  "/",
  authMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    try {
      // @ts-ignore
      const id = req.user.id;
      const zaps = await prisma.zap.findMany({
        where: {
          userId: id,
        },
        include: {
          actions: {
            include: {
              type: true,
            },
          },
          trigger: {
            include: {
              type: true,
            },
          },
        },
      });

      return res.status(200).json({ zaps });
    } catch (error: any) {
      return res.status(500).json({ error: error, message: error.message });
    }
  }
);
zapRouter.get(
  "/:zapId",
  authMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const zap = await prisma.zap.findUnique({
        where: {
          id: req.params.zapId,
        },
        include: {
          actions: {
            include: {
              type: true,
            },
          },
          trigger: {
            include: {
              type: true,
            },
          },
        },
      });

      if (!zap) {
        return res.status(404).json({ error: "Zap not found" });
      }

      return res.status(200).json({ zap });
    } catch (error: any) {
      return res.status(500).json({ error: error, message: error.message });
    }
  }
);
