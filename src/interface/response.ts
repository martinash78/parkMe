export interface AppSuccessResponse<T> {
  response: T;
}

export interface ErrorResponse<T> {
  code: number;
  error: T;
}
