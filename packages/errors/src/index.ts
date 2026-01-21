import { CoreError } from "./core.error";

export class BadRequestError extends CoreError {
  constructor(message: string = "Bad Request!") {
    super(message, 400);
  }
}

export class InvalidInputsError extends CoreError {
  constructor(message: string = "Invalid Inputs!") {
    super(message, 400);
  }
}

export class NotFoundError extends CoreError {
  constructor(message: string = "Resouce Not Found!") {
    super(message, 404);
  }
}

export class UnauthorizedError extends CoreError {
  constructor(message: string = "Unauthorized Request!") {
    super(message, 401);
  }
}

export class ForbiddenError extends CoreError {
  constructor(message: string = "Forbidden Request!") {
    super(message, 403);
  }
}

export class ConflictError extends CoreError {
  constructor(message: string = "Confliect Error!") {
    super(message, 409);
  }
}
