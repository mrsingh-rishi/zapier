import { Router } from "express";
import { userRouter } from "./user";
import { zapRouter } from "./zap";

export const router = Router();

router.use("/user", userRouter);
router.use("/zap", zapRouter);
