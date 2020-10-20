import {createConfig, RaguServerBaseConfigProps} from "ragu-server";
import {VueComponentResolver} from "./component-resolver";
import {merge} from "webpack-merge";
import {raguVueWebpackHydrateConfig, raguVueWebpackViewConfig} from "./webpack";

export const createVueRaguServerConfig = (requiredConfig: RaguServerBaseConfigProps) => {
  const config = createConfig(requiredConfig);

  if (!requiredConfig.components.resolver) {
    config.components.resolver = new VueComponentResolver(config);
  }

  if (!requiredConfig.compiler.webpack?.view) {
    config.compiler.webpack.view = merge(
        config.compiler.webpack.view,
        raguVueWebpackViewConfig(config)
    );
  }

  if (!requiredConfig.compiler.webpack?.hydrate) {
    config.compiler.webpack.hydrate = merge(
        config.compiler.webpack.hydrate,
        raguVueWebpackHydrateConfig(config)
    );
  }

  return config;
}
