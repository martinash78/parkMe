import { SpaceController } from "../../../src/controllers/spaceController";
import { getMockRes, getMockReq } from "@jest-mock/express";
import { SpaceService } from "../../../src/services/spaceService";
jest.mock("../../../src/services/spaceService");

describe("Test all spaces", () => {
  beforeEach(() => {
    (SpaceService.all as jest.Mock).mockClear();
  });

  test("Get a list of all spaces", async () => {
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
    ];
    (SpaceService.all as jest.Mock).mockResolvedValue(expectedResponse);

    await SpaceController.allSpaces(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining(expectedResponse)
    );
  });

  test("Fail to get a list", async () => {
    const { res, next, clearMockRes } = getMockRes();
    const req = getMockReq();
    const message = "Something went wrong";
    const error = new Error(message);
    (SpaceService.all as jest.Mock).mockRejectedValue(error);

    await SpaceController.allSpaces(req, res).catch((error) => {
      expect(error.message).toMatch(message);
    });
  });
});

describe("Test create space", () => {
  test("Successful create", async () => {
    const { res, next, clearMockRes } = getMockRes();
    const req = getMockReq();
    let expectedResponse = {
      _id: 10,
      onLoan: false,
      status: "available",
      ownerId: "602fd7fef44e9e59c477a947",
      loaneeId: "",
      __v: 0,
    };
    (SpaceService.createSpace as jest.Mock).mockResolvedValue(expectedResponse);

    await SpaceController.createSpace(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining(expectedResponse)
    );
  });

  test("Fail to create space", async () => {
    const { res, next, clearMockRes } = getMockRes();
    const req = getMockReq();
    const message = "Something went wrong";
    const error = new Error(message);
    (SpaceService.createSpace as jest.Mock).mockRejectedValue(error);

    await SpaceController.createSpace(req, res).catch((error) => {
      expect(error.message).toMatch(error);
    });
  });
});

describe("Test available spaces", () => {
  test("Successful available spaces", async () => {
    const { res } = getMockRes();
    const req = getMockReq();
    let expectedResponse = [
      {
        _id: 10,
        onLoan: false,
        status: "available",
        ownerId: "602fd7fef44e9e59c477a947",
        loaneeId: "",
        __v: 0,
      },
    ];
    (SpaceService.available as jest.Mock).mockResolvedValue(expectedResponse);

    await SpaceController.availableSpaces(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining(expectedResponse)
    );
  });

  test("Fail available spaces", async () => {
    const { res, next, clearMockRes } = getMockRes();
    const req = getMockReq();
    const message = "Something went wrong";
    const error = new Error(message);
    (SpaceService.available as jest.Mock).mockRejectedValue(error);

    await SpaceController.availableSpaces(req, res).catch((error) => {
      expect(error.message).toMatch(error);
    });
  });
});

describe("Test claim space", () => {
  test("Successful available spaces", async () => {
    const { res } = getMockRes();
    const req = getMockReq({ body: { id: 1 }, user: { id: 1 } });
    let expectedResponse = {
      _id: 11,
      onLoan: true,
      status: "unavailable",
      ownerId: "60351a036788b50072af9481",
      loaneeId: "60351a2d6788b50072af9482",
      __v: 0,
    };
    (SpaceService.claim as jest.Mock).mockResolvedValue(expectedResponse);

    await SpaceController.claimSpace(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining(expectedResponse)
    );
  });

  test("Fail claim space", async () => {
    const { res, next, clearMockRes } = getMockRes();
    const req = getMockReq({ body: { id: 1 }, user: { id: 1 } });
    const message = "Something went wrong";
    const error = new Error(message);
    (SpaceService.claim as jest.Mock).mockRejectedValue(error);

    await SpaceController.claimSpace(req, res).catch((error) => {
      expect(error.message).toMatch(error);
    });
  });
});

describe("Test offer space", () => {
  test("Successful offer spaces", async () => {
    const { res } = getMockRes();
    const req = getMockReq({ body: { id: 1 }, user: { id: 1 } });
    let expectedResponse = {
      _id: 10,
      onLoan: false,
      status: "available",
      ownerId: "602fd7fef44e9e59c477a947",
      loaneeId: 0,
      __v: 0,
    };
    (SpaceService.offer as jest.Mock).mockResolvedValue(expectedResponse);

    await SpaceController.offerSpace(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining(expectedResponse)
    );
  });

  test("Fail offer space", async () => {
    const { res, next, clearMockRes } = getMockRes();
    const req = getMockReq({ body: { id: 1 }, user: { id: 1 } });
    const message = "Something went wrong";
    const error = new Error(message);
    (SpaceService.offer as jest.Mock).mockRejectedValue(error);

    await SpaceController.offerSpace(req, res).catch((error) => {
      expect(error.message).toMatch(error);
    });
  });
});
