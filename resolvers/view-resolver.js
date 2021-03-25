const Vue = require("vue");

var _webpackRequire = (path) => eval('require')(path);

function createToHTMLString() {
  var toHTMLString;

  if (Vue.createSSRApp) {
    // Vue3
    var {renderToString} = _webpackRequire('@vue/server-renderer');

    return (comp) => renderToString(Vue.createSSRApp(comp))
  } else {
    // Vue2
    var vueServerRenderer = _webpackRequire("vue-server-renderer");
    var renderer = vueServerRenderer.createRenderer();

    return (comp) => renderer.renderToString(comp);
  }
}

module.exports = (component, stateResolver) => ({
  render: function (props) {
    var toHTMLString = createToHTMLString();
    props = {...props, ...props.params};

    return stateResolver(props)
      .then((state) => toHTMLString(component({...props, state}, state))
          .then((html) => ({html: html, state: state})))
  }
})
