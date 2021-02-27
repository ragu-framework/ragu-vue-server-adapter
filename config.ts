import {createConfig, RaguServerBaseConfigProps} from "ragu-server";
import {VueComponentResolver} from "./component-resolver";
import {merge} from "webpack-merge";
import {raguVueWebpackHydrateConfig, raguVueWebpackViewConfig} from "./webpack";

export const createVueRaguServerConfig = (requiredConfig: RaguServerBaseConfigProps) => {
  const config = createConfig(requiredConfig);

  if (!requiredConfig?.components?.resolver) {
    config.components.resolver = new VueComponentResolver(config);
  }

  if (!requiredConfig?.compiler?.webpack?.clientSide) {
    config.compiler.webpack.clientSide = merge(
        config.compiler.webpack.clientSide,
        raguVueWebpackHydrateConfig(config)
    );
  }

  if (!requiredConfig?.compiler?.webpack?.serverSide) {
    config.compiler.webpack.serverSide = merge(
        config.compiler.webpack.serverSide,
        raguVueWebpackViewConfig(config)
    );
  }

  return config;
}
