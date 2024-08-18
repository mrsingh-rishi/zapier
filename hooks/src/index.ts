import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.post("/hooks/catch/:userId/:zapId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  const body = req.body || {};
  try {
    await prisma.$transaction(async (txn) => {
      const zaprun = await prisma.zapRun.create({
        data: {
          zapId,
          metadata: body,
        },
      });

      await prisma.zapRunOutbox.create({
        data: {
          zapRunId: zaprun.id,
        },
      });
    });
    res.status(200).json({ message: "Captured" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create zapRun" });
  }
});

app.listen(port);
