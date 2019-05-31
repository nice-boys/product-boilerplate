import React from "react";
import { Flex, Box } from "rebass";
import { GetViewerComponent } from "../graphql/queries/getViewer.generated";
import Heading from "../components/Heading";

export default () => {
  return (
    <GetViewerComponent>
      {({ data, loading, error }) => {
        if (data) {
          return (
            <Flex alignItems="center" justifyContent="center" mt={4}>
              {data.viewer && data.viewer.name ? (
                <Heading>
                  Hello {data.viewer ? data.viewer.name : "anonymous"}.{" "}
                  <a href="/api/auth/logout">Log out</a>
                </Heading>
              ) : (
                <Box>
                  Please <a href="/api/auth/google">log in</a>.
                </Box>
              )}
            </Flex>
          );
        }

        if (loading) return <p>Loading...</p>;

        if (error) return <p>Error :(</p>;

        return null;
      }}
    </GetViewerComponent>
  );
};
