import { Request, Response } from "express";
import { sendSuccess } from "../api/response";
import { sendError } from "../api/response";
import UserService from "../services/userService";

const userService = new UserService();

export let createUser = async (req: any, res: any): Promise<void> => {
  try {
    const newUser = await userService.createUser(req.body);
    return sendSuccess(res, newUser, 200);
  } catch (error) {
    sendError(res, error, 400);
  }
};

export let allUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const allUsers = await userService.allUsers();
    return sendSuccess(res, allUsers, 200);
  } catch (error) {
    sendError(res, error, 400);
  }
};

export let login = async (req: any, res: any): Promise<void> => {
  try {
    const { email, password } = req.body;
    const token = await userService.login(email, password);
    return sendSuccess(res, { token: token }, 200);
  } catch (error) {
    sendError(res, error, 400);
  }
};

export let me = async (req: any, res: any): Promise<void> => {
  try {
    const user = await userService.me(req.user.id);
    return sendSuccess(res, user, 200);
  } catch (error) {
    sendError(res, error, 400);
  }
};

export let getUser = async (req: any, res: any): Promise<void> => {
  try {
    const user = await userService.getUser(req.params.userId);
    return sendSuccess(res, user, 200);
  } catch (error) {
    sendError(res, error, 400);
  }
};
