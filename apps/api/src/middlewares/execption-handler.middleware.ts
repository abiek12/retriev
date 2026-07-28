import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { ApiResponse } from "../utils/response.builder";
import { logger } from "../utils/logger";

const globalExceptionHandler = (err: Error, c: Context) => {
  logger.error(
    {
      err,
      path: c.req.path,
      method: c.req.method,
    },
    "Unhandled exception",
  );

  if (err instanceof HTTPException) {
    return c.json(ApiResponse.error("HTTP_ERROR", err.message), err.status);
  }

  return c.json(
    ApiResponse.error("INTERNAL_SERVER_ERROR", "Something went wrong."),
    500,
  );
};

export default globalExceptionHandler;
