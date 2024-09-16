export class CustomError extends Error {
  constructor(errorInfo: Record<string, unknown>) {
    // Stringify the object and pass it to the Error class
    super(JSON.stringify(errorInfo));

    // Set the name of the error to the class name (Optional)
    this.name = this.constructor.name;

    // Maintain proper stack trace (Optional but useful)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
