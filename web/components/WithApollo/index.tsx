import React from "react";
import { getClient } from "./client";
import Head from "next/head";
import { AppComponentType } from "next/app";
import { NextAppContext, AppProps, DefaultAppIProps } from "next/app";
import { getDataFromTree } from "react-apollo";
import { ApolloClient, NormalizedCacheObject } from "apollo-boost";

export interface ApolloAppProps extends AppProps, DefaultAppIProps {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  apolloState?: NormalizedCacheObject;
}

export default (App: AppComponentType<ApolloAppProps>) => {
  return class Apollo extends React.Component<ApolloAppProps> {
    static displayName = "withApollo(App)";
    apolloClient: ApolloClient<NormalizedCacheObject>;
    static async getInitialProps(ctx: NextAppContext) {
      const {
        Component,
        router,
        ctx: { req }
      } = ctx;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = getClient(undefined, req);
      if (!process.browser) {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              pageProps={{}}
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error("Error while running `getDataFromTree`", error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState
      };
    }

    constructor(props: ApolloAppProps) {
      super(props);
      this.apolloClient = getClient(props.apolloState, undefined);
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};
