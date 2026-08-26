import { authResolvers } from "./auth";
import { userResolvers } from "./user";

export const resolvers = {
  Query: {
    health: () => "API is running",

    ...userResolvers.Query,
  },

  Mutation: {
    ...authResolvers.Mutation,
  },
};