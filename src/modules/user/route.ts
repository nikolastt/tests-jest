import { Router } from "express";
import {
  createUserHandle,
  deleteUserHandle,
  editUserHandle,
  userHandler,
} from "./controller";

const userRoutes = Router();

userRoutes.get("/", userHandler);
userRoutes.post("/", createUserHandle);
userRoutes.delete("/", deleteUserHandle);
userRoutes.post("/edit", editUserHandle);

export { userRoutes };
