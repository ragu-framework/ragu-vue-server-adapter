const {createVueRaguServerConfig} = require('ragu-vue-server-adapter/config');

const port = parseInt(process.env.PORT || '3100');

module.exports = createVueRaguServerConfig({
  compiler: {
    assetsPrefix: process.env.ASSETS_PREFIX || `http://localhost:${port}/component-assets/`,
  },
  components: {
    namePrefix: 'ragu-vue-server-adapter-docs-mfe_',
    defaultDependencies: [
      {
        nodeRequire: 'vue',
        globalVariable: 'Vue',
        dependency: 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js'
      }
    ]
  },
  server: {
    port
  }
});
