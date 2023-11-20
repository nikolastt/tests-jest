import { Router } from "express";
import {
  createProductHandle,
  deleteProductHandle,
  productHandler,
} from "./controller";

const producRoutes = Router();

producRoutes.get("/", productHandler);
producRoutes.post("/", createProductHandle);
producRoutes.delete("/", deleteProductHandle);

export { producRoutes };
