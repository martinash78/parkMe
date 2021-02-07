import { Request, Response } from "express";
import { ISpace } from "../interface/ISpace";
import { IUser } from "../interface/IUser";
import { sendSuccess } from "../api/response";
import { sendError } from "../api/response";
import SpaceService from "../services/SpaceService";

const spaceService = new SpaceService();

export let allSpaces = async (req: Request, res: Response) => {
  spaceService
    .all()
    .then((spaces) => {
      sendSuccess(res, spaces, 200);
    })
    .catch((error) => {
      sendError(res, error.message, 400);
    });
};

export let createSpace = async (req: Request, res: Response) => {
  spaceService
    .createSpace(req.body)
    .then((space) => {
      sendSuccess(res, space, 200);
    })
    .catch((error) => {
      sendError(res, error.message, 400);
    });
};

export let availableSpaces = async (req: Request, res: Response) => {
  spaceService
    .available()
    .then((spaces) => {
      sendSuccess(res, spaces, 200);
    })
    .catch((error) => {
      sendError(res, error.message, 400);
    });
};

export let claimSpace = async (req: any, res: any) => {
  let spaceId: ISpace["id"] = req.body.id;
  let userId: IUser["id"] = req.user.id;

  spaceService
    .claim(spaceId, userId)
    .then((space) => {
      sendSuccess(res, space, 200);
    })
    .catch((error) => {
      sendError(res, error.message, 400);
    });
};

export let offerSpace = async (req: any, res: any) => {
  let spaceId: ISpace["id"] = req.body.id;
  let userId: IUser["id"] = req.user.id;

  spaceService
    .offer(spaceId, userId)
    .then((space) => {
      sendSuccess(res, space, 200);
    })
    .catch((error) => {
      sendError(res, error.message, 400);
    });
};
