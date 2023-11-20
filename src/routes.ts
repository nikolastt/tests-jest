import { Application } from "express";
import { userRoutes } from "./modules/user/route";
import { producRoutes } from "./modules/product/route";

const routes = (app: Application) => {
  app.use("/api/user", userRoutes);
  app.use("/api/product", producRoutes);
};

export { routes };
