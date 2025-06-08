import { AUTH_ERROR_MESSAGES, AuthEvent, AuthState } from "@/shared/constants/stateMachine"
import { assign, createMachine, fromPromise } from "xstate"

type AuthContext = {
  error: string | undefined
  credentials?: {
    email: string
    password: string
  }
  user?: {
    id: string
    email: string
    name: string
  }
}

type AuthMachineEvent =
  | { type: AuthEvent.REGISTER; email: string; password: string; name: string }
  | { type: AuthEvent.LOGIN; email: string; password: string }
  | { type: AuthEvent.CLEAR_ERROR }
  | { type: AuthEvent.LOGOUT }

type LoginDoneEvent = {
  output: {
    id: string
    email: string
    name: string
  }
}

const registerUser = fromPromise(async ({ input }: { input: AuthMachineEvent }) => {
  if (input.type !== AuthEvent.REGISTER) {
    throw new Error(AUTH_ERROR_MESSAGES.INVALID_EVENT)
  }

  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: input.email,
      password: input.password,
      name: input.name,
    }),
  })

  if (!response.ok) {
    throw new Error(AUTH_ERROR_MESSAGES.REGISTRATION_FAILED)
  }

  const data = await response.json()
  return {
    email: data.user.email,
    password: input.password,
  }
})

const loginUser = fromPromise(async ({ input }: { input: AuthMachineEvent }) => {
  if (input.type !== AuthEvent.LOGIN) {
    throw new Error(AUTH_ERROR_MESSAGES.INVALID_EVENT)
  }

  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: input.email,
      password: input.password,
    }),
  })

  if (!response.ok) {
    throw new Error(AUTH_ERROR_MESSAGES.LOGIN_FAILED)
  }

  const data = await response.json()
  console.log("Login response data:", data)
  return {
    output: {
      user: data.user,
    },
  }
})

export const authMachine = createMachine({
  id: "auth",
  types: {
    events: {} as AuthMachineEvent,
    context: {} as AuthContext,
  },
  initial: AuthState.IDLE,
  context: {
    error: undefined,
  } as AuthContext,
  states: {
    [AuthState.IDLE]: {
      on: {
        [AuthEvent.REGISTER]: AuthState.REGISTERING,
        [AuthEvent.LOGIN]: AuthState.LOGGING_IN,
        [AuthEvent.CLEAR_ERROR]: {
          actions: assign({ error: undefined }),
        },
      },
    },
    [AuthState.REGISTERING]: {
      invoke: {
        src: registerUser,
        input: ({ event }) => {
          if (!event) throw new Error(AUTH_ERROR_MESSAGES.INVALID_EVENT)
          return event as AuthMachineEvent
        },
        onDone: {
          target: AuthState.LOGGING_IN,
          actions: assign({
            credentials: ({ event }) => {
              if (!event?.output) throw new Error(AUTH_ERROR_MESSAGES.REGISTRATION_FAILED)
              return {
                email: event.output.email,
                password: event.output.password,
              }
            },
          }),
        },
        onError: {
          target: AuthState.ERROR,
          actions: assign({ error: AUTH_ERROR_MESSAGES.REGISTRATION_FAILED }),
        },
      },
    },
    [AuthState.LOGGING_IN]: {
      invoke: {
        src: loginUser,
        input: ({ context, event }) => {
          if (!event) throw new Error(AUTH_ERROR_MESSAGES.INVALID_EVENT)
          if (event.type === AuthEvent.LOGIN) {
            return event
          }
          if (!context.credentials) {
            throw new Error(AUTH_ERROR_MESSAGES.LOGIN_FAILED)
          }
          return {
            type: AuthEvent.LOGIN,
            email: context.credentials.email,
            password: context.credentials.password,
          }
        },
        onDone: {
          target: AuthState.AUTHENTICATED,
          actions: assign({
            user: ({ event }) => {
              console.log("Login success event:", event)
              const output = event.output.output as LoginDoneEvent
              if (!output) {
                console.error("Login failed: Missing user data in response")
                throw new Error(AUTH_ERROR_MESSAGES.LOGIN_FAILED)
              }
              return event.output.user
            },
            error: undefined,
          }),
        },
        onError: {
          target: AuthState.ERROR,
          actions: assign({ error: AUTH_ERROR_MESSAGES.LOGIN_FAILED }),
        },
      },
    },
    [AuthState.AUTHENTICATED]: {
      on: {
        [AuthEvent.LOGOUT]: {
          target: AuthState.IDLE,
          actions: assign({
            user: undefined,
            credentials: undefined,
            error: undefined,
          }),
        },
      },
    },
    [AuthState.ERROR]: {
      on: {
        [AuthEvent.REGISTER]: AuthState.REGISTERING,
        [AuthEvent.LOGIN]: AuthState.LOGGING_IN,
        [AuthEvent.CLEAR_ERROR]: {
          target: AuthState.IDLE,
          actions: assign({ error: undefined }),
        },
      },
    },
  },
})
