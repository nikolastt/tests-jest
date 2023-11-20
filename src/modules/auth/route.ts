import { Router } from "express";
import { authenticateHandler, testAuthHandle } from "./controller";
import authMiddleware from "../../middlewares/authMiddleware";

const authRoutes = Router();

authRoutes.post("", authenticateHandler);
authRoutes.get("/test", authMiddleware, testAuthHandle);

export { authRoutes };
