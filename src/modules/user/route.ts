import { Router } from "express";
import { createUserHandle, deleteUserHandle, userHandler } from "./controller";

const userRoutes = Router();

userRoutes.get("/", userHandler);
userRoutes.post("/", createUserHandle);
userRoutes.delete("/", deleteUserHandle);

export { userRoutes };
