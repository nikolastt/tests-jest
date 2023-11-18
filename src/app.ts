import { Application } from "express";
import express from "express";

import cors from "cors";
import bodyParser from "body-parser";
import { routes } from "./routes";

const app: Application = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
routes(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server running in " + PORT);
});
