import { sendUnauthorised } from "../../../src/api/sendUnauthorised";
import { getMockRes } from "@jest-mock/express";
import { ErrorResponse } from "../../../src/interface/ErrorResponse";

const { res } = getMockRes();

test("Test Message is ok", async () => {
  const expectedResponse: ErrorResponse = {
    error: "User is not authorised",
    code: 400,
  };

  sendUnauthorised(res);

  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining(expectedResponse)
  );
});
