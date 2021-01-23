import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/user";
import spaceRoutes from "./routes/space";
import connectDb from "./connection";
import cors from "cors";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectDb().then(() => {
  app.use("/users", userRoutes);
  app.use("/spaces", spaceRoutes);
  function handleError(err: string) {
    return err;
  }
});

export = app;
