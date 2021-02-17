import User from "../model/User";
import { IUser } from "../interface/IUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default class UserService {
  public allUsers = async (): Promise<IUser[]> => {
    return User.find((err: any, users: IUser[]) => {
      if (err) {
        throw Error("Error");
      } else {
        return users;
      }
    });
  };

  public createUser = async (userData: IUser): Promise<IUser> => {
    const {
      email,
      password,
      forename,
      surname,
      department,
      isAdmin,
    } = userData;

    let existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      throw Error("User Already Exists");
    }

    let newUser = new User({
      email,
      password,
      forename,
      surname,
      department,
      isAdmin,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    return await newUser.save();
  };

  public login = async (email: string, password: string): Promise<string> => {
    let user: IUser = await User.findOne({
      email,
    });

    if (!user) {
      throw Error("User Does Not Exist");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw Error("Incorrect Password");
    }

    const payload = {
      user: {
        id: user.id,
        isAdmin: user.isAdmin,
      },
    };

    return jwt.sign(payload, process.env.SECRET, {
      expiresIn: 3600,
    });
  };

  public me = async (userId: string): Promise<IUser> => {
    try {
      return await User.findById(userId);
    } catch (Error) {
      throw Error(Error.message);
    }
  };

  public getUser = async (userId: string): Promise<IUser> => {
    return User.findById(userId)
      .then((user) => {
        return user;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
}
