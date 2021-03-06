import webpack from "webpack";
import {RaguServerConfig} from "ragu-server";
const VueCliService = require("@vue/cli-service/lib/Service");

function isRequiredPlugin(plugin: any) {
  return plugin.constructor.name === 'VueLoaderPlugin' || plugin.constructor.name === 'MiniCSSExtractPlugin';
}

function deleteWebpackConfigManagedByRagu(resolveWebpackConfig: any) {
  delete resolveWebpackConfig.node;
  delete resolveWebpackConfig.output;
  delete resolveWebpackConfig.context;
  delete resolveWebpackConfig.entry;
}

function configureVueLoaderForSSR(resolveWebpackConfig: any) {
  resolveWebpackConfig.plugins = resolveWebpackConfig.plugins
      .filter((plugin: any) => isRequiredPlugin(plugin));

  const vueRule = resolveWebpackConfig.module.rules
      .find((rule: any) => rule.test.test('file.vue'));

  const vueLoader = vueRule?.use?.find((loader: any) => /vue-loader/.test(loader.loader));

  vueLoader.options = {
    optimizeSSR: true,
    extractCSS: true
  };
}

// @ts-ignore
export const raguVueWebpackBaseConfig = (config: RaguServerConfig): webpack.Configuration => {
  process.env.VUE_CLI_MODE = 'production';

  const vueCliService = new VueCliService(config.projectRoot || process.cwd());
  vueCliService.init('production');

  const chainableWebpackConfig = vueCliService.resolveChainableWebpackConfig()
      .mode('production');

  const resolveWebpackConfig = vueCliService.resolveWebpackConfig(chainableWebpackConfig);

  deleteWebpackConfigManagedByRagu(resolveWebpackConfig);
  configureVueLoaderForSSR(resolveWebpackConfig);

  return resolveWebpackConfig;
}
