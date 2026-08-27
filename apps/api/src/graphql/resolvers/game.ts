import { GraphQLError } from "graphql";

import {
    getBestScore,
    getGameHistory,
    getLeaderboard,
    saveGameResult,
} from "../../services/game.service";

export const gameResolvers = {
    Query: {
        gameHistory: async (
            _: unknown,
            __: unknown,
            context: { userId: string | null },
        ) => {
            if (!context.userId) {
                throw new GraphQLError(
                    "Authentication required",
                    {
                        extensions: {
                            code: "UNAUTHENTICATED",
                        },
                    },
                );
            }

            return getGameHistory(context.userId);
        },

        bestScore: async (
            _: unknown,
            __: unknown,
            context: { userId: string | null },
        ) => {
            if (!context.userId) {
                throw new GraphQLError(
                    "Authentication required",
                    {
                        extensions: {
                            code: "UNAUTHENTICATED",
                        },
                    },
                );
            }

            return getBestScore(context.userId);
        },

        leaderboard: async (
            _: unknown,
            { limit }: { limit?: number },
        ) => {
            return getLeaderboard(limit);
        },
    },

    Mutation: {
        saveGameResult: async (
            _: unknown,
            { input }: { input: unknown },
            context: { userId: string | null },
        ) => {
            if (!context.userId) {
                throw new GraphQLError(
                    "Authentication required",
                    {
                        extensions: {
                            code: "UNAUTHENTICATED",
                        },
                    },
                );
            }

            return saveGameResult(
                context.userId,
                input,
            );
        },
    },
};