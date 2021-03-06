import Space from "../model/Space";
import { ISpace } from "../interface/ISpace";
import User from "../model/User";
import { IUser } from "../interface/IUser";

export const SpaceService = {
  async all(): Promise<ISpace[]> {
    return Space.find()
      .then((spaces: [ISpace]) => {
        return spaces;
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  },

  async createSpace(spaceData: ISpace): Promise<ISpace> {
    let ownerId = spaceData.ownerId;

    let user = await User.findById(ownerId)
      .then((user: IUser) => {
        return user;
      })
      .catch((error) => {
        throw new Error("Error retrieving User");
      });

    if (user) {
      let space: ISpace = new Space(spaceData);
      await space.save();

      return space;
    } else {
      throw Error("User Not Found");
    }
  },

  async available(): Promise<ISpace[]> {
    return Space.find({ status: "available" });
  },

  async claim(spaceId: ISpace["id"], userId: IUser["id"]): Promise<ISpace> {
    return this.canClaimSpace(userId, spaceId)
      .then(() => this.getAvailableSpace(spaceId, userId))
      .then(async (space: ISpace) => {
        space.status = "unavailable";
        if (space.ownerId !== userId) {
          space.onLoan = true;
          space.loaneeId = userId;
        } else {
          space.onLoan = false;
          space.loaneeId = null;
        }
        await space.save();

        return space;
      })
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  },

  async offer(spaceId: ISpace["id"], userId: IUser["id"]): Promise<ISpace> {
    return Space.findById(spaceId)
      .then(async (space) => {
        if (!space) {
          throw new Error(`Space ID ${spaceId} not found`);
        }

        if (
          space.loaneeId === userId ||
          (space.ownerId === userId && space.status === "available")
        ) {
          space.status = "available";
          space.onLoan = false;
          space.loaneeId = null;
          await space.save();

          return space;
        }

        throw new Error("You cannot offer this space");
      })
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  },

  async canClaimSpace(
    userId: IUser["id"],
    spaceId: ISpace["id"]
  ): Promise<boolean> {
    return Space.findOne({ $or: [{ ownerId: userId }, { loaneeId: userId }] })
      .then((space) => {
        if (space && space.id === spaceId && space.ownerId === userId) {
          return true;
        }
        if (space) {
          throw Error(`You are already associated with space ID ${space.id}`);
        }
      })
      .catch((error) => {
        throw Error(error);
      });
  },

  async getAvailableSpace(id: number, userId: string): Promise<ISpace> {
    return Space.findById(id)
      .then((space) => {
        if (!space) {
          throw Error(`Space ID ${id} not found`);
        }
        if (space.status === "available" || space.ownerId === userId) {
          return space;
        }
        throw Error("Space is unavailable");
      })
      .catch((error) => {
        throw Error(error);
      });
  },
};
