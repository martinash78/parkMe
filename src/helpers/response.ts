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

export { sendSuccess, sendError };
