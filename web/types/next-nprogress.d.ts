declare module "next-nprogress" {
  import * as React from "react";
  import { NProgressConfigureOptions } from "nprogress";

  const withNprogress = (
    duration: number,
    options: NProgressConfigureOptions
  ) => (Component: React.ReactNode) => React.ReactNode;

  export default withNprogress;
}

declare module "next-nprogress/component" {
  import * as React from "react";
  const Component: React.FunctionComponent<{ color: string }>;
  export default Component;
}
