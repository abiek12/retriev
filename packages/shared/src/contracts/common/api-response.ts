export interface SuccessResponse<T> {
  success: true;
  data: T;
}

export interface ErrorResponse<TMessage = string> {
  success: false;
  error: {
    code: string;
    message: TMessage;
  };
}

export type ApiResponse<TData, TErrorMessage = string> =
  | SuccessResponse<TData>
  | ErrorResponse<TErrorMessage>;
