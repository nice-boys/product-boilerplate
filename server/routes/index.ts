import { ApolloServer } from "apollo-server-micro";
import schema from "../graphql/schema";
import { prisma } from "../database/generated/client";
import { Context } from "../types";

const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
  context: (): Context => ({
    prisma
  })
});

export default server.createHandler({
  path: "/api"
});
