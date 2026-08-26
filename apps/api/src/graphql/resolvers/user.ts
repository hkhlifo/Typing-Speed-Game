import { GraphQLError } from "graphql";
import prisma from "../../lib/prisma";
import type { GraphQLContext } from "../context";

export const userResolvers = {
    Query: {
        currentUser: async (
            _parent: unknown,
            _args: unknown,
            context: GraphQLContext,
        ) => {
            if (!context.userId) {
                throw new GraphQLError("You must be logged in", {
                    extensions: {
                        code: "UNAUTHENTICATED",
                    },
                });
            }

            const user = await prisma.user.findUnique({
                where: {
                    id: context.userId,
                },
            });

            if (!user) {
                throw new GraphQLError("User not found", {
                    extensions: {
                        code: "NOT_FOUND",
                    },
                });
            }

            return user;
        },
    },
};