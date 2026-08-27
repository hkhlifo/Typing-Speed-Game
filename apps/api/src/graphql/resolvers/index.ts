import { authResolvers } from "./auth";
import { gameResolvers } from "./game";
import { userResolvers } from "./user";


export const resolvers = {
  Query: {
    health: () => "API is running",

    ...userResolvers.Query,
    ...gameResolvers.Query,
  },

  Mutation: {
    ...authResolvers.Mutation,
    ...gameResolvers.Mutation,
  },
};