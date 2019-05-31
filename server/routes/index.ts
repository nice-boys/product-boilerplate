import { queryType, stringArg, makeSchema } from "nexus";
import { ApolloServer } from "apollo-server-micro";

const Query = queryType({
  definition(t) {
    t.string("hello", {
      args: { name: stringArg({ nullable: true }) },
      resolve: (_, { name }) => `Hello ${name || "World"}!`
    });
  }
});

const schema = makeSchema({
  types: [Query],
  outputs: false
});

const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true
});

export default server.createHandler({
  path: "/api"
});
