function sendSuccess(res: any, response: Object, statusCode: number) {
  res.status(statusCode).json(response).send().end();
}

function sendError(res: any, response: String, statusCode: number) {
  let error = {
    code: statusCode,
    error: response,
  };
  res.status(statusCode).json(error).send().end();
}

function sendUnauthorised(res: any) {
  sendError(res, "User is not authorised", 400);
}

function isAdmin(req: any): boolean {
  return req.user.isAdmin;
}

export { sendSuccess, sendError, isAdmin, sendUnauthorised };
