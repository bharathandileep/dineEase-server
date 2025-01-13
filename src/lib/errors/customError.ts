export class CustomError extends Error {
  public statusCode: number;
  public status: boolean;

  constructor(message: string, statusCode: number, status: boolean = false) {
    super(message); // Call the parent class constructor with the message
    this.statusCode = statusCode;
    this.status = status;

    // Ensure the prototype chain is properly set
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
