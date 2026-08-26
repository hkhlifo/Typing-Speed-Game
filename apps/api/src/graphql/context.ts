import { GraphQLError } from "graphql";
import { verifyToken } from "../auth/jwt";

export type GraphQLContext = {
  userId: string | null;
};

export async function createContext(
  request: Request,
): Promise<GraphQLContext> {
  const authorization = request.headers.get("authorization");

  if (!authorization) {
    return {
      userId: null,
    };
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new GraphQLError("Invalid authorization header", {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });
  }

  try {
    const userId = await verifyToken(token);

    return {
      userId,
    };
  } catch {
    throw new GraphQLError("Invalid or expired token", {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });
  }
}