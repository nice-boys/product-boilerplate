const withTypescript = require("@zeit/next-typescript");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const typescriptFormatter = require("react-dev-utils/typescriptFormatter");

module.exports = withTypescript({
  serverless: true,
  webpack(config, options) {
    // Do not run type checking twice:
    if (options.isServer)
      config.plugins.push(
        new ForkTsCheckerWebpackPlugin({
          async: true,
          useTypescriptIncrementalApi: true,
          checkSyntacticErrors: true,
          formatter: typescriptFormatter
        })
      );

    return config;
  }
});
