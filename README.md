# Nice Boys™️ Product Boilerplate

Quickly ship your apps with the power of code generation.

## Philosophy

> "Speed of developer iteration is the single most important factor in how quickly a technology company can move."
>
> — Paul Biggar, cofounder CircleCI

Product boilerplate is [@brianlovin](https://github.com/brianlovin) and [@mxstbr](https://github.com/mxstbr)'s personal setup to quickly build new apps. It aims to get all the common stuff out of the way and make shipping and subsequently iterating on a product as quick as possible.

There are three important traits in all the included tooling that we pay attention to:

1. **Mastery**: We know most of these tools inside and out and have a lot of experience with them.
2. **Code generation**: The less boilerplate code we need to write, the more we can focus on our app. Code generation allows us to automate the tedious parts.
3. **Type safety**: Counterintuitively, having strict type safety lets you move faster because you get warnings about bugs right in your IDE without having to recompile.

Note that this is our personal boilerplate. You are more than welcome to use it (that's why it's open source), but we cannot give any support when using it. Make sure you understand the tools in it before using it!

## Stack

The entire app (front- and backend) uses [Next.js](https://nextjs.org) in serverless-mode for development, and deployment is powered by [Now](https://now.sh).

### Tools

- [TypeScript](https://typescriptlang.org)
- [Prettier](https://prettier.io)
- [ESLint](https://eslint.org)
- [yarn](https://yarnpkg.com) workspaces for the monorepo support
- [GraphQL Codegen](https://graphql-code-generator.com)

### Frontend

- [React](https://github.com/facebook/react)
- [Next.js](https://github.com/zeit/next.js)
- [styled-components](https://github.com/styled-components/styled-components)
- [rebass](https://rebassjs.org)
- [@nice-boys/components](https://github.com/nice-boys/components)

### Backend

- [GraphQL](https://graphql.org)
- [Apollo Server](http://apollographql.com/docs/apollo-server) for exposing said GraphQL schema through the API
- [GraphQL Nexus](https://nexus.js.org) for creating a type-safe GraphQL API
- [Prisma](https://prisma.io) for type-safe database access
- [Passport](http://www.passportjs.org/) for authentication

## Working with the boilerplate

### Code Generation

There are three code generators at work in this boilerplate:

- [GraphQL Codegen](https://graphql-code-generator.com) automatically generates React components for the frontend that fetch from the API. They are fully typed too, so you know exactly what the shape of the returned data is.
- [Prisma](https://prisma.io) generates a fully type-safe database client from our datamodel.
- [GraphQL Nexus](https://nexus.js.org) (in combination with Prisma) lets us expose a production-ready GraphQL API from the database client.

### Routing

All routing happens via the folder structure in the `web/pages/` folder. Any route under `web/pages/api` will be treated as an [API route](https://nextjs.org/docs#api-routes), all others as React routes.

To add dynamic routing use the Next.js [dynamic routes feature](https://nextjs.org/docs#dynamic-routes).

### Commands

To start the app locally you have to run these two commands:

- `yarn run dev`: Stars the development process for the serverless front- and backend, as well as all generation processes.
- `yarn run db`: Starts the database locally (note: requires Docker to be up and running and docker-compose to be installed)

Further, you will frequently use these commands while developing and they are automatically run whenever you switch branches or pull new code to make sure your generated files are up to date:

- `yarn run db:deploy`: Update your local database with changes you made to the datamodel.
- `yarn run generate`: Runs all the codegeneration commands in sequence. You can also run them manually if necessary:
  - `yarn run generate:db`: Generate the Prisma database client for the server.
  - `yarn run generate:server`: Generate the `schema.graphql` file for the backend from the Nexus schema
  - `yarn run generate:web`: Generate the fetching hooks and types for the frontend from the `.graphql` files contained within it

These are automatically run in a pre-commit hook, so don't worry about calling them manually unless you have a reason to:

- `yarn run prettify`: Prettifies the `src` folder with [Prettier](https://prettier.io).
- `yarn run lint`: Lints the `src` folder with [ESLint](https://eslint.org).

### Deployment

To deploy the database, look at the Prisma docs, e.g. their tutorial on [deploying the database to AWS fargate](https://www.prisma.io/tutorials/deploy-prisma-to-aws-fargate-ct14).

Once that is up and running, to deploy the app you simply run `now`, that's it! We recommend enabling the Now GitHub integration for CD.

## License

Licensed under the MIT License.
