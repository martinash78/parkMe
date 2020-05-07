import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 8080;
const host = "0.0.0.0";
import userRoutes from "./routes/user";
import spaceRoutes from "./routes/space";
import connectDb from "./connection";

app.use(bodyParser.urlencoded({ extended: true }));

connectDb().then(() => {
  app.use("/users", userRoutes);
  app.use("/spaces", spaceRoutes);

  app.listen(port, host, () =>
    console.log(`Example app listening at http://${host}:${port}`)
  );

  function handleError(err: string) {
    return err;
  }
});
