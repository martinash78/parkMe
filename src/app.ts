import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
const app = express();
import userRoutes from "./routes/user";
import spaceRoutes from "./routes/space";
import connectDb from "./connection";

app.use(bodyParser.urlencoded({ extended: true }));

connectDb().then(() => {
  app.use("/users", userRoutes);
  app.use("/spaces", spaceRoutes);
  function handleError(err: string) {
    return err;
  }
});

export = app;
