import { queryType, stringArg, makeSchema } from "nexus";
const path = require("path");

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
  outputs: {
    schema: path.join(__dirname, "../schema.graphql"),
    typegen: path.join(__dirname, "../types.generated.ts")
  }
});

export default schema;
