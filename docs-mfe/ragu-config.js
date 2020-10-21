const {createVueRaguServerConfig} = require('ragu-vue-server-adapter/config');

const port = parseInt(process.env.PORT || '3100');

module.exports = createVueRaguServerConfig({
  compiler: {
    assetsPrefix: process.env.ASSETS_PREFIX || `http://localhost:${port}/component-assets/`,
  },
  components: {
    namePrefix: 'my_project_name_'
  },
  server: {
    port
  }
});
