import {raguVueWebpackBaseConfig} from "./webpack.base.config";
import {RaguServerConfig} from "ragu-server";

const {merge} = require("webpack-merge");

export const raguVueWebpackViewConfig = (config: RaguServerConfig) => merge(raguVueWebpackBaseConfig(config), {});
