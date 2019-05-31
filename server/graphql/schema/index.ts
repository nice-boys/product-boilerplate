import { queryType, stringArg, makeSchema } from "nexus";

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

export default schema;
