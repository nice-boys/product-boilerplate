import express from "express";
import { ApolloServer } from "apollo-server-express";
import middlewares from "../../utils/middlewares";
import schema from "../../graphql/schema";
import { Photon } from "../../database/generated/photon";

const app = express();
const photon = new Photon();

middlewares(app);

const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
  context: ({ req }) => {
    return {
      photon,
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
