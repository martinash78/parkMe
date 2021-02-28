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

if (process.env.NODE_ENV !== "test") {
  connectDb()
    .then(() => {
      app.use("/users", userRoutes);
      app.use("/spaces", spaceRoutes);
    })
    .catch((error) => {
      console.log(error);
    });
}

export = app;
