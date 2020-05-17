import { Request, Response } from "express";
import User, { IUser } from "../model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { sendSuccess } from "../helpers/response";
import { sendError } from "../helpers/response";
import { isAdmin } from "../helpers/response";
import { sendUnauthorised } from "../helpers/response";

export let allUsers = (req: Request, res: Response) => {
  if (isAdmin(req)) {
    User.find((err: any, users: any) => {
      if (err) {
        res.send("Error!");
      } else {
        res.send(users);
      }
    });
  } else {
    sendUnauthorised(res);
  }
};

export let getUser = (req: any, res: any) => {
  let id = req.params.userId;
  if (isAdmin(req) || req.user.id === id) {
    User.findById(id, function (err: string, user: IUser) {
      if (err) return sendError(res, "Cannot find User ID " + id, 400);
      res.send(user);
    });
  } else {
    sendUnauthorised(res);
  }
};

export let createUser = (req: Request, res: Response) => {
  var user = new User(req.body);
  user.save((err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
};

export let signUp = async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { username, email, password, forename, surname, department } = req.body;
  try {
    let user = await User.findOne({
      email,
    });
    if (user) {
      sendError(res, "User Already Exists", 400);
    }

    user = new User({
      username,
      email,
      password,
      forename,
      surname,
      department,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        isAdmin: user.isAdmin,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        sendSuccess(res, { token }, 200);
      }
    );
  } catch (err) {
    console.log(err.message);
    sendError(res, "Error in Saving", 500);
  }
};

export let login = async (req: any, res: any) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({
      email,
    });
    if (!user)
      return res.status(400).json({
        message: "User Does Not Exist",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Incorrect Password !",
      });

    const payload = {
      user: {
        id: user.id,
        isAdmin: user.isAdmin,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
        });
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export let me = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
};
