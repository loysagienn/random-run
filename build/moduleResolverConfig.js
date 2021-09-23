const path = require("path");

const isProductionMode = process.env.NODE_ENV === "production";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const commonAlias = {
  client: "./src/client",
  server: "./src/server",
  components: "./src/components",
  reducer: "./src/reducer",
  store: "./src/store",
  types: "./src/types",
  selectors: "./src/selectors",
  utils: "./src/utils",
  stravaApi: "./src/stravaApi",
  data: "./src/data",
  actions: "./src/actions",
  config: isProductionMode
    ? "./src/config/production"
    : "./src/config/development",
};

const serverAlias = {
  env: "./src/server",
};

const clientAlias = {
  env: "./src/client",
};

const moduleResolverConfig = ({ isWebpack = false, isBabel = false } = {}) => {
  const envAlias = isWebpack ? clientAlias : serverAlias;

  const alias = {
    ...commonAlias,
    ...envAlias,
  };

  return { alias, extensions };
};

module.exports = moduleResolverConfig;
