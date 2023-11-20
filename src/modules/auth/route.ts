import { Router } from "express";
import { authenticateHandler } from "./controller";

const authRoutes = Router();

authRoutes.post("", authenticateHandler);

export { authRoutes };
