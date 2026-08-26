import { GraphQLError } from "graphql";
import { ZodError } from "zod";
import { loginUser, registerUser } from "../../services/auth.service";

function handleAuthError(error: unknown): never {
  if (error instanceof ZodError) {
    throw new GraphQLError("Invalid input", {
      extensions: {
        code: "BAD_USER_INPUT",
        validationErrors: error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
    });
  }

  if (error instanceof Error) {
    throw new GraphQLError(error.message, {
      extensions: {
        code: "BAD_REQUEST",
      },
    });
  }

  throw new GraphQLError("An unexpected error occurred", {
    extensions: {
      code: "INTERNAL_SERVER_ERROR",
    },
  });
}

export const authResolvers = {
  Mutation: {
    register: async (
      _parent: unknown,
      args: { input: unknown },
    ) => {
      try {
        return await registerUser(args.input);
      } catch (error) {
        return handleAuthError(error);
      }
    },

    login: async (
      _parent: unknown,
      args: { input: unknown },
    ) => {
      try {
        return await loginUser(args.input);
      } catch (error) {
        return handleAuthError(error);
      }
    },
  },
};