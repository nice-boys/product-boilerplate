import { nexusPrismaPlugin } from "nexus-prisma";
import { objectType, queryType, makeSchema } from "nexus";
const path = require("path");

const User = objectType({
  name: "User",
  definition(t) {
    t.model.name();
    t.model.id();
    t.model.avatarUrl();
  }
});

const Query = queryType({
  definition(t) {
    t.crud.findOneUser({
      alias: "user"
    });
    t.field("viewer", {
      type: "User",
      nullable: true,
      resolve: (_, __, ctx) =>
        ctx.viewerId ? ctx.photon.user({ id: ctx.viewerId }) : null
    });
  }
});

const outputs = process.env.GENERATE
  ? {
      schema: path.join(__dirname, "../schema.generated.graphql"),
      typegen: path.join(__dirname, "../nexus-schema-types.generated.ts")
    }
  : {
      schema: false,
      typegen: false
    };

const schema = makeSchema({
  types: [Query, User],
  plugins: [nexusPrismaPlugin()],
  outputs,
  typegenAutoConfig: {
    sources: [
      {
        source: "../../database/generated/photon",
        alias: "photon"
      },
      {
        source: path.join(__dirname, "../../types/graphql.ts"),
        alias: "types"
      }
    ],
    contextType: "types.Context"
  }
});

export default schema;
