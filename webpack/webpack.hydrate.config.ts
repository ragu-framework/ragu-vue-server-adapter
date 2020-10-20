import {raguVueWebpackBaseConfig} from "./webpack.base.config";
import {RaguServerConfig} from "ragu-server";
const {merge} = require("webpack-merge");
const nodeExternals = require('webpack-node-externals');



export const raguVueWebpackHydrateConfig = (config: RaguServerConfig) =>
    merge(raguVueWebpackBaseConfig(config), config.environment === 'development' ? {
      devtool: 'source-map'
    } : {}, {
      externals: nodeExternals({
        allowlist: /\.css$/
      }),
      target: 'web',
    });
