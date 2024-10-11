import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(15),
  name: z.string(),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(15),
});

export const zapierCreateSchema = z.object({
  availableTriggerId: z.string(),
  triggerMetadata: z.any().optional(),
  actions: z.array(
    z.object({
      availableActionId: z.string(),
      actionMetadata: z.any().optional(),
    })
  ),
});
