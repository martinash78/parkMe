import { Request, Response } from "express";
import Space, { ISpace } from "../model/Space";
import User, { IUser } from "../model/User";
import { sendSuccess } from "../helpers/response";
import { sendError } from "../helpers/response";
import { isAdmin } from "../helpers/response";
import { sendUnauthorised } from "../helpers/response";

export let allSpaces = (req: Request, res: Response) => {
  Space.find((err: any, spaces: [ISpace]) => {
    if (err) {
      res.send("Error!");
    } else {
      sendSuccess(res, spaces, 200);
    }
  });
};

export let createSpace = async (req: Request, res: Response) => {
  if (isAdmin(req)) {
    let space: ISpace = new Space(req.body);
    let ownerId = req.body.ownerId;
    await User.findById(ownerId, (err: any, user: IUser) => {
      if (err) {
        sendError(res, err, 400);
      } else {
        if (!user) {
          sendError(res, "User does not exist", 400);
        }
      }
    });
    space.save((err: any) => {
      if (err) {
        sendError(res, err, 400);
      } else {
        sendSuccess(res, space, 200);
      }
    });
  } else {
    sendUnauthorised(res);
  }
};

export let availableSpaces = (req: Request, res: Response) => {
  let spaces = Space.find(
    { status: "available" },
    (err: any, spaces: [ISpace]) => {
      if (err) {
        res.send(err);
      } else {
        res.send(spaces);
      }
    }
  );
};

export let claimSpace = async (req: any, res: any) => {
  let id: ISpace["id"] = req.body.id;
  let userId: string = req.user.id;
  await canClaimSpace(userId).then(
    () => {
      isSpaceAvailable(id, userId).then(
        async (space: ISpace) => {
          space.status = "unavailable";
          if (space.ownerId !== userId) {
            space.onLoan = true;
            space.loaneeId = userId;
          } else {
            space.onLoan = false;
            space.loaneeId = null;
          }
          await space.save();
          sendSuccess(res, space, 201);
        },
        (err) => {
          sendError(res, err, 400);
        }
      );
    },
    (err) => {
      sendError(res, err, 400);
    }
  );
};

export let offerSpace = async (req: any, res: any) => {
  let id: ISpace["id"] = req.body.id;
  let userId: string = req.user.id;
  canOfferSpace(id, userId).then(
    async (space: ISpace) => {
      space.status = "available";
      space.onLoan = false;
      space.loaneeId = null;
      await space.save();
      sendSuccess(res, space, 201);
    },
    (err) => {
      sendError(res, err, 400);
    }
  );
};

async function isSpaceAvailable(id: number, userId: string) {
  return new Promise((resolve, reject) => {
    Space.findById(id, (err: any, space: ISpace) => {
      if (err) {
        return reject(err);
      } else {
        if (!space) {
          return reject("Space ID " + id + " not found");
        }
        if (space.status === "available" || space.ownerId === userId) {
          return resolve(space);
        }
        reject("Space is unavailable");
      }
    });
  });
}

async function canOfferSpace(id: number, userId: string) {
  return new Promise((resolve, reject) => {
    Space.findById(id, (err: any, space: ISpace) => {
      if (err) {
        return reject(err);
      } else {
        if (!space) {
          return reject("Space ID " + id + " not found");
        }
        if (space.loaneeId === userId || space.ownerId === userId) {
          return resolve(space);
        }
        reject("You cannot offer this space");
      }
    });
  });
}

async function canClaimSpace(userId: string) {
  return new Promise((resolve, reject) => {
    Space.findOne(
      { $or: [{ ownerId: userId }, { loaneeId: userId }] },
      (err: any, space: ISpace) => {
        if (err) {
          return reject(err);
        } else {
          if (space) {
            return reject(
              "You are already associcated with space ID " + space.id
            );
          } else {
            resolve(true);
          }
        }
      }
    );
  });
}
