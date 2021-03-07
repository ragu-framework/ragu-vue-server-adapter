const Vue = require("vue");

var toHTMLString;

var _webpackRequire = (path) => eval('require')(path);

if (Vue.createSSRApp) {
  // Vue3
  var { renderToString } = _webpackRequire('@vue/server-renderer');

  toHTMLString = (comp) => renderToString(Vue.createSSRApp(comp))
} else {
  // Vue2
  var vueServerRenderer = _webpackRequire("vue-server-renderer");
  var renderer = vueServerRenderer.createRenderer();

  toHTMLString = (comp) => renderer.renderToString(comp);
}


module.exports = (component, stateResolver) => ({
  render: function (props) {
    return stateResolver(props)
      .then((state) => toHTMLString(component(props, state))
          .then((html) => ({html: html, state: state})))
  }
})
