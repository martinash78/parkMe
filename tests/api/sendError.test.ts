import { sendError } from "../../src/api/sendError";
import { getMockRes } from "@jest-mock/express";
import { ErrorResponse } from "../../src/interface/ErrorResponse";

const { res } = getMockRes();

test("basic", async () => {
  const error = "There was an error";
  const errorCode = 400;
  const expectedResponse: ErrorResponse = {
    code: errorCode,
    error: error,
  };

  sendError(res, error, errorCode);

  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining(expectedResponse)
  );
});
