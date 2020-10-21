const {createVueRaguServerConfig} = require('ragu-vue-server-adapter/config');

const port = parseInt(process.env.PORT || '3100');

module.exports = createVueRaguServerConfig({
  compiler: {
    assetsPrefix: process.env.ASSETS_PREFIX || `http://localhost:${port}/component-assets/`,
  },
  components: {
    namePrefix: 'ragu-vue-server-adapter-docs-mfe_'
  },
  server: {
    port
  }
});
