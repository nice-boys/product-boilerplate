// @flow
import React from "react";
import App, { Container, AppComponentProps } from "next/app";
// import { ApolloProvider } from "react-apollo";
import NProgress from "next-nprogress/component";
import withNProgress from "next-nprogress";
import GlobalStyles from "../components/GlobalStyles";
// import withApollo from "../components/WithApollo/";
import theme from "../theme";

export const createApp = (
  input: { top?: React.ReactNode; bottom?: React.ReactNode } = {}
) => {
  class MyApp extends App<AppComponentProps /* & { apolloClient: any } */> {
    render() {
      const { Component, pageProps /*, apolloClient */ } = this.props;

      return (
        <Container>
          <NProgress color={theme.brand.default} />
          {/* <ApolloProvider client={apolloClient}> */}
          <GlobalStyles />
          {input.top}
          <Component {...pageProps} />
          {input.bottom}
          {/* </ApolloProvider> */}
        </Container>
      );
    }
  }

  return withNProgress(1000, { showSpinner: false })(
    /* withApollo(MyApp) */ MyApp
  );
};

export default createApp();
