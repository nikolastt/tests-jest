import { Application } from "express";
import { userRoutes } from "./modules/user/route";
import { producRoutes } from "./modules/product/route";
import { authRoutes } from "./modules/auth/route";

const routes = (app: Application) => {
  app.use("/api/user", userRoutes);
  app.use("/api/product", producRoutes);
  app.use("/api/auth", authRoutes);
};

export { routes };
