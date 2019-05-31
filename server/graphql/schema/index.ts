import { prisma } from "../../database/generated/client";
import datamodelInfo from "../../database/generated/nexus-prisma";
import { prismaObjectType, makePrismaSchema } from "nexus-prisma";
const path = require("path");

const Query = prismaObjectType({
  name: "Query",
  definition(t) {
    t.prismaFields(["user", "users"]);
    t.field("viewer", {
      type: "User",
      nullable: true,
      resolve: (_, __, ctx) =>
        ctx.viewerId ? ctx.prisma.user({ id: ctx.viewerId }) : null
    });
  }
});

const schema = makePrismaSchema({
  types: [Query],
  prisma: {
    datamodelInfo,
    client: prisma
  },
  outputs: {
    schema: path.join(__dirname, "../schema.graphql"),
    typegen: path.join(__dirname, "../types.generated.ts")
  },
  typegenAutoConfig: {
    sources: [
      {
        source: path.join(__dirname, "../../types.ts"),
        alias: "types"
      }
    ],
    contextType: "types.Context"
  }
});

export default schema;
