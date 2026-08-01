import type {
  ErrorResponse,
  SuccessResponse,
} from "@repo/shared/contracts/common";

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
