import { Request, Response } from "express";
import { sendSuccess } from "../api/sendSuccess";
import { sendError } from "../api/sendError";
import { UserService } from "../services/UserService";

export const UserController = {
  async createUser(req: Request, res: Response): Promise<void> {
    UserService.createUser(req.body)
      .then((newUser) => {
        sendSuccess(res, newUser, 200);
      })
      .catch((error) => {
        sendError(res, error.message, 400);
      });
  },
  async allUsers(req: Request, res: Response): Promise<void> {
    UserService.allUsers()
      .then((allUsers) => {
        sendSuccess(res, allUsers, 200);
      })
      .catch((error) => {
        sendError(res, error.message, 400);
      });
  },
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    UserService.login(email, password)
      .then((token) => {
        sendSuccess(res, token, 200);
      })
      .catch((error) => {
        sendError(res, error.message, 400);
      });
  },
  async me(req: any, res: Response): Promise<void> {
    UserService.me(req.user.id)
      .then((user) => {
        sendSuccess(res, user, 200);
      })
      .catch((error) => {
        sendError(res, error.message, 400);
      });
  },
  async getUser(req: Request, res: Response): Promise<void> {
    UserService.getUser(req.params.userId)
      .then((user) => {
        sendSuccess(res, user, 200);
      })
      .catch((error) => {
        sendError(res, error.message, 400);
      });
  },
};
