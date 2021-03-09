
      var component = require('/home/runner/work/ragu-vue-server-adapter/ragu-vue-server-adapter/docs-mfe/ragu-components/quick-start');
      var resolver = require('/home/runner/work/ragu-vue-server-adapter/ragu-vue-server-adapter/docs-mfe/node_modules/ragu-vue-server-adapter/resolvers/hydrate-resolver');

      module.exports.default = (resolver.default || resolver)(component.default || component);
    