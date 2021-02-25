import { Request, Response } from "express";
import { ISpace } from "../interface/ISpace";
import { IUser } from "../interface/IUser";
import { sendSuccess } from "../api/sendSuccess";
import { sendError } from "../api/sendError";
import { SpaceService } from "../services/SpaceService";

export const SpaceController = {
  async allSpaces(req: Request, res: Response) {
    SpaceService.all()
      .then((spaces) => {
        sendSuccess(res, spaces, 200);
      })
      .catch((error) => {
        sendError(res, error.message, 400);
      });
  },
  async createSpace(req: Request, res: Response) {
    SpaceService.createSpace(req.body)
      .then((space) => {
        sendSuccess(res, space, 200);
      })
      .catch((error) => {
        sendError(res, error.message, 400);
      });
  },
  async availableSpaces(req: Request, res: Response) {
    SpaceService.available()
      .then((spaces) => {
        sendSuccess(res, spaces, 200);
      })
      .catch((error) => {
        sendError(res, error.message, 400);
      });
  },
  async claimSpace(req: any, res: any) {
    let spaceId: ISpace["id"] = req.body.id;
    let userId: IUser["id"] = req.user.id;

    SpaceService.claim(spaceId, userId)
      .then((space) => {
        sendSuccess(res, space, 200);
      })
      .catch((error) => {
        sendError(res, error.message, 400);
      });
  },
  async offerSpace(req: any, res: any) {
    let spaceId: ISpace["id"] = req.body.id;
    let userId: IUser["id"] = req.user.id;

    SpaceService.offer(spaceId, userId)
      .then((space) => {
        sendSuccess(res, space, 200);
      })
      .catch((error) => {
        sendError(res, error.message, 400);
      });
  },
};
