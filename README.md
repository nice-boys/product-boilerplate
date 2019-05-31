# Nice Boys™️ Product Boilerplate

Quickly build new products and apps.

## Commands

- `yarn dev`: Stars the development process (front- and backend) with `now dev`
- `yarn graphql:codegen`: Generate the fetching hooks and types for the frontend from the `.graphql` files contained within it
- `yarn run graphql:codegen:schema`: Generate the `schema.graphql` file for the backend from the Nexus schema

## Stack

The entire app (front- and backend) uses [Zeit Now](https://now.sh) for development and deployment.

### Frontend

- [React](https://github.com/facebook/react)
- [Next.js](https://github.com/zeit/next.js)
- [styled-components](https://github.com/styled-components/styled-components)
- [TypeScript](typescriptlang.org)
- [Prettier](https://prettier.io)
- [ESLint](https://eslint.org)
- [yarn](https://yarnpkg.com) workspaces for the monorepo support

### Backend

The backend is fully serverless, every file within `servers/routes/` exports a single function with the signature `(res, req)` that will be deployed at the route within the folder.

For example, `servers/routes/auth/github.js` would be accessible at `myapp.com/api/auth/github`.

The full stack is:

- [GraphQL Nexus](https://nexus.js.org) for creating a type-safe GraphQL schema
- [Apollo Server](http://apollographql.com/docs/apollo-server) for exposing said GraphQL schema through the API
- [Passport](https://passportjs.org) for authentication

## Scripts

- `yarn run web dev`: Start frontend dev server
- `yarn run prettify`: Prettifies the `src` folder with [Prettier](https://prettier.io).
- `yarn run lint`: Lints the `src` folder with [ESLint](https://eslint.org).

## License

Licensed under the MIT License.
