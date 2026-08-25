import { createYoga, createSchema } from "graphql-yoga";
import { typeDefs } from "./src/graphql/schema/typeDefs";
import { resolvers } from "./src/graphql/resolvers";

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
});

const port = Number(process.env.PORT) || 4000;

Bun.serve({
  port,
  fetch: yoga,
});

console.log(`🚀 GraphQL server running at http://localhost:${port}/graphql`);