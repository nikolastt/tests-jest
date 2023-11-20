import { Application } from "express";
import express from "express";

import cors from "cors";
import bodyParser from "body-parser";
import { routes } from "./routes";

export const app: Application = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
routes(app);

const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}
