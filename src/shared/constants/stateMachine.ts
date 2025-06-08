export enum AuthEvent {
  REGISTER = "REGISTER",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  CLEAR_ERROR = "CLEAR_ERROR",
}

export enum AuthState {
  IDLE = "idle",
  REGISTERING = "registering",
  LOGGING_IN = "logging_in",
  AUTHENTICATED = "authenticated",
  ERROR = "error",
}

export const AUTH_ERROR_MESSAGES = {
  INVALID_EVENT: "Invalid event type",
  REGISTRATION_FAILED: "Registration failed",
  LOGIN_FAILED: "Login failed",
} as const
