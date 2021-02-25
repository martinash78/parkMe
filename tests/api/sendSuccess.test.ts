import { sendSuccess } from "../../src/api/sendSuccess";
import { getMockRes } from "@jest-mock/express";

const { res } = getMockRes();

test("Test Message is ok", async () => {
  const message = { id: 1 };
  const statusCode = 200;

  sendSuccess(res, message, statusCode);

  expect(res.json).toHaveBeenCalledWith(message);
});
