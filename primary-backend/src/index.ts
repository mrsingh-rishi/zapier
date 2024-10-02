import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./router";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { User } from "./middleware/middleware";
import { prisma } from "./db/db";
import { getEmailVerificationSuccessPage } from "./templates/email";

dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req: Request, res: Response): Promise<any> => {
  const token = req.query.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = jwt.verify(token as string, JWT_SECRET) as User;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await prisma.user.update({
      where: { id: Number(user.id) },
      data: {
        verified: true,
      },
    });

    const verifiedTemplate = getEmailVerificationSuccessPage();

    // TODO: fix the redirection link for the login page
    return res.status(200).send(verifiedTemplate);
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: "Invalid or expired token" }); // Respond with 403 (Forbidden) if token is invalid
  }
});

app.use("/api/v1", router);

app.listen(port, () => console.log("listening on port " + port));
