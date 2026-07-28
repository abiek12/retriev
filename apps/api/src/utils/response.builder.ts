import { ErrorResponse, SuccessResponse } from "./interfaces";

export class ApiResponse {
  static success<T>(data: T): SuccessResponse<T> {
    return {
      success: true,
      data,
    };
  }

  static error<T>(code: string, message: T): ErrorResponse<T> {
    return {
      success: false,
      error: {
        code,
        message,
      },
    };
  }
}
