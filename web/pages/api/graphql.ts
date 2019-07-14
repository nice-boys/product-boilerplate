import express from "express";
import { ApolloServer } from "apollo-server-express";
import middlewares from "../../utils/middlewares";
import schema from "../../graphql/schema";
import { prisma } from "../../database/generated/client";

const app = express();

middlewares(app);

const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
  context: ({ req }) => {
    return {
      prisma,
      viewerId: req.user ? req.user : undefined
    };
  }
});

server.applyMiddleware({ app, path: "*" });

export const config = {
  api: {
    bodyParser: false
  }
};

export default app;
