export const ERROR_TYPES = {
  // Common error types
  VALIDATION_ERROR: "ValidationError",
  AUTHENTICATION_ERROR: "AuthenticationError",
  DATABASE_ERROR: "DatabaseError",
  SERVER_ERROR: "ServerError",

  // Client-side errors
  BAD_REQUEST_ERROR: "BadRequestError",
  UNAUTHORIZED_ERROR: "UnauthorizedError",
  FORBIDDEN_ERROR: "ForbiddenError",
  NOT_FOUND_ERROR: "NotFoundError",
  METHOD_NOT_ALLOWED_ERROR: "MethodNotAllowedError",
  UNPROCESSABLE_ENTITY_ERROR: "UnprocessableEntityError",

  // Server-side errors
  INTERNAL_SERVER_ERROR_TYPE: "InternalServerError",
  NOT_IMPLEMENTED_ERROR: "NotImplementedError",
  BAD_GATEWAY_ERROR: "BadGatewayError",
  SERVICE_UNAVAILABLE_ERROR: "ServiceUnavailableError",
  GATEWAY_TIMEOUT_ERROR: "GatewayTimeoutError",

  // Specific error types
  INVALID_INPUT_ERROR: "InvalidInputError",
  UNEXPECTED_ERROR: "UnexpectedError",
  TIMEOUT_ERROR: "TimeoutError",
  DEPENDENCY_ERROR: "DependencyError",
  CONFLICT_ERROR: "ConflictError",
  RATE_LIMIT_ERROR: "RateLimitError",

  // Business logic errors
  INVALID_CREDENTIALS_ERROR: "InvalidCredentialsError",
  EXPIRED_SESSION_ERROR: "ExpiredSessionError",
  INSUFFICIENT_FUNDS_ERROR: "InsufficientFundsError",
  UNAUTHORIZED_ACTION_ERROR: "UnauthorizedActionError",
};
