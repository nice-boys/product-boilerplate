import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject
} from "apollo-boost";
import { IncomingMessage } from "http";

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = require("isomorphic-unfetch");
}

function create(initialState?: NormalizedCacheObject, req?: IncomingMessage) {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: "/api",
      credentials: "include",
      headers: req &&
        req.headers.cookie && {
          cookie: req.headers.cookie
        }
    }),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export function getClient(
  initialState?: NormalizedCacheObject,
  req?: IncomingMessage
) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections
  if (!process.browser) {
    return create(initialState, req);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, req);
  }

  return apolloClient;
}
