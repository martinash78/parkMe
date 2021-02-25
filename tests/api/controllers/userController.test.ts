import { UserController } from "../../../src/controllers/userController";
import { getMockRes, getMockReq } from "@jest-mock/express";
import { UserService } from "../../../src/services/userService";
jest.mock("../../../src/services/userService");

describe("Test create user", () => {
  test("Successful create", async () => {
    const { res, next, clearMockRes } = getMockRes();
    const req = getMockReq();
    let expectedResponse = {
      isAdmin: false,
      createdAt: "2021-02-25T11:47:54.865Z",
      __V: 0,
      _id: "60378e81d1a2eb0030abbd4f",
      email: "492121@gmail.com",
      password: "$2a$10$JSUVmoVwe1Y9b4RtQa/rPuVWTkjsf/ZHcb.2TY2ixj03xlimURKBW",
      forename: "Martin",
      surname: "Ashcroft",
      department: "I.T.",
      __v: 0,
    };
    (UserService.createUser as jest.Mock).mockResolvedValue(expectedResponse);

    await UserController.createUser(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining(expectedResponse)
    );
  });

  test("Fail to create a user", async () => {
    const { res, next, clearMockRes } = getMockRes();
    const req = getMockReq();
    const message = "Something went wrong";
    const error = new Error(message);
    (UserService.createUser as jest.Mock).mockRejectedValue(error);

    await UserController.createUser(req, res).catch((error) => {
      expect(error.message).toMatch(message);
    });
  });
});

describe("Test get all users", () => {
  test("Successful get all users", async () => {
    const { res, next, clearMockRes } = getMockRes();
    const req = getMockReq();
    let expectedResponse = [
      {
        isAdmin: true,
        createdAt: "2021-01-23T13:35:32.082Z",
        __V: 0,
        _id: "602fd7fef44e9e59c477a947",
        email: "admin@admin.com",
        password:
          "$2a$10$7dUTQMDwJw75FwroBpfdsu9P8/pnlggQso/0yQhs.SbB4kcIpUhCO",
        forename: "Admin",
        surname: "User",
        department: "I.T.",
        __v: 0,
      },
      {
        isAdmin: false,
        createdAt: "2021-02-22T18:31:57.343Z",
        __V: 0,
        _id: "6033f9b2c60613001ebe5002",
        email: "404673@gmail.com",
        password:
          "$2a$10$6nhL.eAef7k9VdbUr4knB.PqrAxr/ggHnVJGCY/bRUN21DaWmJwAa",
        forename: "Martin",
        surname: "Ashcroft",
        department: "I.T.",
        __v: 0,
      },
      {
        isAdmin: false,
        createdAt: "2021-02-23T13:33:44.253Z",
        __V: 0,
        _id: "60351a036788b50072af9481",
        email: "754602@gmail.com",
        password:
          "$2a$10$0APwB576OQv3hcStQ6prFeWV5SMeDu7Qy4MSHADEIn4x7gBoGK6xe",
        forename: "Martin",
        surname: "Ashcroft",
        department: "I.T.",
        __v: 0,
      },
      {
        isAdmin: false,
        createdAt: "2021-02-23T13:33:44.253Z",
        __V: 0,
        _id: "60351a2d6788b50072af9482",
        email: "351556@gmail.com",
        password:
          "$2a$10$8ERzWZ8YYy57MgSWa3S5keB32hZcbRWnYWtvYXMFcqGdcaKYbx7xO",
        forename: "Martin",
        surname: "Ashcroft",
        department: "I.T.",
        __v: 0,
      },
      {
        isAdmin: false,
        createdAt: "2021-02-25T11:47:54.865Z",
        __V: 0,
        _id: "60378e81d1a2eb0030abbd4f",
        email: "492121@gmail.com",
        password:
          "$2a$10$JSUVmoVwe1Y9b4RtQa/rPuVWTkjsf/ZHcb.2TY2ixj03xlimURKBW",
        forename: "Martin",
        surname: "Ashcroft",
        department: "I.T.",
        __v: 0,
      },
    ];
    (UserService.allUsers as jest.Mock).mockResolvedValue(expectedResponse);

    await UserController.allUsers(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining(expectedResponse)
    );
  });

  test("Fail to get all users", async () => {
    const { res, next, clearMockRes } = getMockRes();
    const req = getMockReq();
    const message = "Something went wrong";
    const error = new Error(message);
    (UserService.allUsers as jest.Mock).mockRejectedValue(error);

    await UserController.allUsers(req, res).catch((error) => {
      expect(error.message).toMatch(message);
    });
  });
});

describe("Test login user", () => {
  test("Successful login", async () => {
    const { res } = getMockRes();
    const req = getMockReq();
    let expectedResponse = {
      token: "fakeToken",
    };

    (UserService.login as jest.Mock).mockResolvedValue(expectedResponse);

    await UserController.login(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining(expectedResponse)
    );
  });

  test("Fail to login", async () => {
    const { res, next, clearMockRes } = getMockRes();
    const req = getMockReq();
    const message = "Something went wrong";
    const error = new Error(message);
    (UserService.login as jest.Mock).mockRejectedValue(error);

    await UserController.login(req, res).catch((error) => {
      expect(error.message).toMatch(message);
    });
  });
});

describe("Test get me", () => {
  test("Successful me", async () => {
    const { res, next, clearMockRes } = getMockRes();
    const req = getMockReq({ user: { id: 1 } });
    let expectedResponse = {
      isAdmin: true,
      createdAt: "2021-01-23T13:35:32.082Z",
      __V: 0,
      _id: "602fd7fef44e9e59c477a947",
      email: "admin@admin.com",
      password: "$2a$10$7dUTQMDwJw75FwroBpfdsu9P8/pnlggQso/0yQhs.SbB4kcIpUhCO",
      forename: "Admin",
      surname: "User",
      department: "I.T.",
      __v: 0,
    };

    (UserService.me as jest.Mock).mockResolvedValue(expectedResponse);

    await UserController.me(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining(expectedResponse)
    );
  });

  test("Fail to get me", async () => {
    const { res, next, clearMockRes } = getMockRes();
    const req = getMockReq({ user: { id: 1 } });
    const message = "Something went wrong";
    const error = new Error(message);
    (UserService.me as jest.Mock).mockRejectedValue(error);

    await UserController.me(req, res).catch((error) => {
      expect(error.message).toMatch(message);
    });
  });
});

describe("Test get user", () => {
  test("Successful get user", async () => {
    const { res, next, clearMockRes } = getMockRes();
    const req = getMockReq();
    let expectedResponse = {
      isAdmin: true,
      createdAt: "2021-01-23T13:35:32.082Z",
      __V: 0,
      _id: "602fd7fef44e9e59c477a947",
      email: "admin@admin.com",
      password: "$2a$10$7dUTQMDwJw75FwroBpfdsu9P8/pnlggQso/0yQhs.SbB4kcIpUhCO",
      forename: "Admin",
      surname: "User",
      department: "I.T.",
      __v: 0,
    };

    (UserService.getUser as jest.Mock).mockResolvedValue(expectedResponse);

    await UserController.getUser(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining(expectedResponse)
    );
  });

  test("Fail to get user", async () => {
    const { res, next, clearMockRes } = getMockRes();
    const req = getMockReq();
    const message = "Something went wrong";
    const error = new Error(message);
    (UserService.getUser as jest.Mock).mockRejectedValue(error);

    await UserController.getUser(req, res).catch((error) => {
      expect(error.message).toMatch(message);
    });
  });
});
