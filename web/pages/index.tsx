import React from "react";
import { useGetViewerQuery } from "../graphql/queries/getViewer.generated";
import Heading from "../components/Heading";

export default () => {
  const { data, error, loading } = useGetViewerQuery();

  if (data) {
    return (
      <Heading css={{ color: "blue" }}>
        Hello {data.viewer ? data.viewer.name : "anonymous"}
      </Heading>
    );
  }

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error :(</p>;

  return null;
};
