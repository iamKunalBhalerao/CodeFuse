export class CoreError extends Error {
  statusCode: number;
  // isOperational: boolean;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    // this.isOperational = true;

    Object.setPrototypeOf(this, CoreError.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}
