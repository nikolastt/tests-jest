import { Application } from "express";
import { userRoutes } from "./modules/user/route";

const routes = (app: Application) => {
  app.use("/api/user", userRoutes);
};

export { routes };
