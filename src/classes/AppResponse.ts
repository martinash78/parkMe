import { Response } from "express";
import { ErrorResponse } from "../interface/response";

export class AppResponse<T> {
  private response: Response;
  private statusCode: number;

  public constructor(response: Response) {
    this.response = response;
  }

  public sendSuccess(appSuccessResponse: T) {
    return this.response.status(200).json(appSuccessResponse).send().end();
  }

  public sendError(appSuccessResponse: ErrorResponse<any>) {
    return this.response
      .status(this.statusCode)
      .json(appSuccessResponse.error)
      .send()
      .end();
  }
}
