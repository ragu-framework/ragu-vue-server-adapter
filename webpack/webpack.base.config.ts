import webpack from "webpack";
import {RaguServerConfig} from "ragu-server";

const VueCliService = require("@vue/cli-service/lib/Service");

function isRequiredPlugin(plugin: any) {
  const requiredPlugins = [
    'VueLoaderPlugin',
    'CaseSensitivePathsPlugin',
    'MiniCssExtractPlugin',
    'OptimizeCssnanoPlugin',
    'HashedModuleIdsPlugin',
    'CopyPlugin',
  ];

  return requiredPlugins.includes(plugin.constructor.name);
}

function deleteWebpackConfigManagedByRagu(resolveWebpackConfig: any) {
  delete resolveWebpackConfig.node;
  delete resolveWebpackConfig.output;
  delete resolveWebpackConfig.context;
  delete resolveWebpackConfig.entry;
  delete resolveWebpackConfig.optimization?.splitChunks;
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


function handleStaticFiles(resolveWebpackConfig: any, config: RaguServerConfig) {
  const staticFilesFormats = [
    'file.png',
    'file.svg',
    'file.mp3',
    'file.ttf'
  ]

  const isLoaderFromStaticFiles = (regex: RegExp) =>
      staticFilesFormats.find((file) => regex.test(file))

  const allLoaders = resolveWebpackConfig.module.rules
      .filter((rule: any) => {
        return isLoaderFromStaticFiles(new RegExp(rule?.test));
      });

  allLoaders?.forEach((imagesLoader: any) => {
    imagesLoader?.use?.forEach((loader: any) => {
      loader.options = loader.options || {};
      loader.options.publicPath = config.compiler.assetsPrefix;
    })
  });
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
  handleStaticFiles(resolveWebpackConfig, config);

  return resolveWebpackConfig;
}
