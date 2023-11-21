import { Router } from "express";
import {
  createProductHandle,
  deleteProductHandle,
  editProductHandle,
  productHandler,
} from "./controller";

const producRoutes = Router();

producRoutes.get("/", productHandler);
producRoutes.post("/", createProductHandle);
producRoutes.post("/edit", editProductHandle);
producRoutes.delete("/", deleteProductHandle);

export { producRoutes };
