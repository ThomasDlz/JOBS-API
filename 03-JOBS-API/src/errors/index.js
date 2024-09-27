import { StatusCodes } from "http-status-codes";

class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthenticatedError";
    this.StatusCode = StatusCodes.UNAUTHORIZED;
  }
}

export { UnauthenticatedError };
