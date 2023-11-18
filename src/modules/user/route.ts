import { Router } from "express";
import { createUserHandle, userHandler } from "./controller";

const userRoutes = Router();

userRoutes.get("/", userHandler);
userRoutes.post("/", createUserHandle);

export { userRoutes };
