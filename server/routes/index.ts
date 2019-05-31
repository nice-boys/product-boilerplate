import { ApolloServer } from "apollo-server-micro";
import schema from "../graphql/schema";

const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true
});

export default server.createHandler({
  path: "/api"
});
