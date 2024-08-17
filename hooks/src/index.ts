import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.post("/hooks/catch/:userId/:zapId", (req: Request, res: Response) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;


  
});

app.listen(port);
