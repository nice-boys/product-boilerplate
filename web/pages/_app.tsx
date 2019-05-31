// @flow
import React from "react";
import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";
import NProgress from "next-nprogress/component";
import withNProgress from "next-nprogress";
import { BaseStyles } from "@nice-boys/components";
import withApollo, { ApolloAppProps } from "../components/WithApollo";
import theme from "../theme";

class MyApp extends App<ApolloAppProps> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <Container>
        <NProgress color={theme.brand.default} />
        <ApolloProvider client={apolloClient}>
          <BaseStyles />
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

// @ts-ignore
export default withNProgress(1000, { showSpinner: false })(withApollo(MyApp));
