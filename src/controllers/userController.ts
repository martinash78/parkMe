import { Request, Response } from "express";
import { sendSuccess } from "../api/response";
import { sendError } from "../api/response";
import UserService from "../services/userService";

const userService = new UserService();

export let createUser = async (req: any, res: any): Promise<void> => {
  userService
    .createUser(req.body)
    .then((newUser) => {
      sendSuccess(res, newUser, 200);
    })
    .catch((error) => {
      sendError(res, error.message, 400);
    });
};

export let allUsers = async (req: Request, res: Response): Promise<void> => {
  userService
    .allUsers()
    .then((allUsers) => {
      sendSuccess(res, allUsers, 200);
    })
    .catch((error) => {
      sendError(res, error.message, 400);
    });
};

export let login = async (req: any, res: any): Promise<void> => {
  const { email, password } = req.body;

  userService
    .login(email, password)
    .then((token) => {
      sendSuccess(res, { token: token }, 200);
    })
    .catch((error) => {
      sendError(res, error.message, 400);
    });
};

export let me = async (req: any, res: any): Promise<void> => {
  userService
    .me(req.user.id)
    .then((user) => {
      sendSuccess(res, user, 200);
    })
    .catch((error) => {
      sendError(res, error.message, 400);
    });
};

export let getUser = async (req: any, res: any): Promise<void> => {
  userService
    .getUser(req.params.userId)
    .then((user) => {
      sendSuccess(res, user, 200);
    })
    .catch((error) => {
      sendError(res, error.message, 400);
    });
};
