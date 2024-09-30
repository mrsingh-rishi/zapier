import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./router";

dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("api/v1", router);

app.listen(port);
