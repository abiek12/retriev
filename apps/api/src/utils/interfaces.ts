export interface SuccessResponse<T> {
  success: true;
  data: T;
}

export interface ErrorResponse<T> {
  success: false;
  error: {
    code: string;
    message: T;
  };
}
