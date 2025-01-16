export class CustomError extends Error {
  statusCode: number;
  status: boolean;
  errorType: string;

  constructor(
    message: string,
    statusCode: number,
    errorType: string = "Error",
    status: boolean = false
  ) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
    this.errorType = errorType;

    // Ensure the prototype chain is properly set
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
