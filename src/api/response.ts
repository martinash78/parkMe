function sendSuccess(res: any, response: Object, statusCode: number): void {
  res.status(statusCode).json(response).send().end();
}

function sendError(res: any, response: String, statusCode: number): void {
  let error = {
    code: statusCode,
    error: response,
  };
  res.status(statusCode).json(error).send().end();
}

function sendUnauthorised(res: any): void {
  sendError(res, "User is not authorised", 400);
}

export { sendSuccess, sendError, sendUnauthorised };
