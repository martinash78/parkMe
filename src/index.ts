import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 8080;
const host = "0.0.0.0";
const connectDb = require("./src/connection");
const User = require("./src/model/User");
const Space = require("./src/model/Space");
app.use(bodyParser.urlencoded({ extended: true }));
// var db = connectDb;
// db.on("error", console.error.bind(console, "connection error:"));
connectDb().then(() => {
  app.get("/user", function (req, res) {
    User.find(function (err, users) {
      if (err) return handleError(err);
      res.send(users);
    });
  });

  app.get("/user/:userId", function (req, res) {
    let id = req.params.userId;
    User.findById(id, function (err, user) {
      if (err) return res.send("Cannot find ID " + id);
      res.send(user);
    });
  });

  app.post("/user", function (req, res) {
    var user = new User(req.body);
    user.save(function (err) {
      if (err) return res.send(err);
    });
    res.send(user);
  });

  app.get("/space", function (req, res) {
    Space.find(function (err, spaces) {
      if (err) return handleError(err);
      res.send(spaces);
    });
  });

  app.post("/space", function (req, res) {
    let id = req.body._id;
    (async () => {
      try {
        await Space.findById(id, function (err, space) {
          if (space) {
            res.send("Space already exists");
          } else {
            var space = new Space(req.body);
            space.save(function (err) {
              if (err) return res.send(err);
            });
            res.send(space);
          }
          return res.end();
        });
      } catch (error) {
        res.send(error);
        return res.end();
      }
    })();
  });

  app.listen(port, host, () =>
    console.log(`Example app listening at http://${host}:${port}`)
  );

  function handleError(err: string) {
    return err;
  }
});
