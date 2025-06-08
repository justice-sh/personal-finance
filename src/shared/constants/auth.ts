export enum AuthMode {
  LOGIN = "login",
  REGISTER = "register",
}

export enum AuthField {
  NAME = "name",
  EMAIL = "email",
  PASSWORD = "password",
}

export const AUTH_MESSAGES = {
  LOGIN: {
    TITLE: "Login",
    DESCRIPTION: "Enter your email below to login to your account",
    BUTTON: "Login",
  },
  REGISTER: {
    TITLE: "Register",
    DESCRIPTION: "Create a new account to get started",
    BUTTON: "Register",
    NAME_REQUIRED: "Name is required",
  },
  LOADING: "Loading...",
  VALIDATION: {
    NAME_REQUIRED: "Name is required",
    EMAIL_REQUIRED: "Email is required",
    EMAIL_INVALID: "Invalid email address",
    PASSWORD_REQUIRED: "Password is required",
    PASSWORD_MIN_LENGTH: "Password must be at least 6 characters",
  },
} as const

export const AUTH_VALIDATION = {
  NAME: {
    REQUIRED: "Name is required",
  },
  EMAIL: {
    REQUIRED: "Email is required",
    INVALID: "Invalid email address",
  },
  PASSWORD: {
    REQUIRED: "Password is required",
    MIN_LENGTH: "Password must be at least 6 characters",
  },
} as const
