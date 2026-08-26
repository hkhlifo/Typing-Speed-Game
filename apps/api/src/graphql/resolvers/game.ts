import { GraphQLError } from "graphql";
import { ZodError } from "zod";

import type { GraphQLContext } from "../context";

import {
    getBestScore,
    getGameHistory,
    getLeaderboard,
    saveGameResult,
} from "../../services/game.service";

function requireUser(context: GraphQLContext): string {
    if (!context.userId) {
        throw new GraphQLError("You must be logged in", {
            extensions: {
                code: "UNAUTHENTICATED",
            },
        });
    }

    return context.userId;
}

function handleGameError(error: unknown): never {
    if (error instanceof ZodError) {
        throw new GraphQLError("Invalid game result", {
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

export const gameResolvers = {
    Query: {
        gameHistory: async (
            _parent: unknown,
            _args: unknown,
            context: GraphQLContext,
        ) => {
            const userId = requireUser(context);

            return getGameHistory(userId);
        },

        bestScore: async (
            _parent: unknown,
            _args: unknown,
            context: GraphQLContext,
        ) => {
            const userId = requireUser(context);

            return getBestScore(userId);
        },

        leaderboard: async (
            _parent: unknown,
            args: { limit?: number },
        ) => {
            const limit = Math.min(Math.max(args.limit ?? 10, 1), 100);

            return getLeaderboard(limit);
        },
    },

    Mutation: {
        saveGameResult: async (
            _parent: unknown,
            args: { input: unknown },
            context: GraphQLContext,
        ) => {
            const userId = requireUser(context);

            try {
                return await saveGameResult(
                    userId,
                    args.input,
                );
            } catch (error) {
                return handleGameError(error);
            }
        },
    },
};