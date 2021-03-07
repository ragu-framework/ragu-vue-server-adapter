const Vue = require("vue");

function getVueApp (component) {
  if (Vue.createApp) {
    return Vue.createApp(component);
  }

  return component;
}


module.exports = (component) => ({
  hydrate: function (el, props, state) {
    el.app = getVueApp(component(props, state));

    if (el.app.$mount) {
      el.app.$mount(el.querySelector('[data-server-rendered]'));

      return;
    }

    el.app.mount(el.querySelector('[data-server-rendered]'));
  },
  render: function (el, props, state) {
    el.app = getVueApp(component(props, state));

    if (el.app.$mount) {
      var renderedComponent = el.app.$mount();
      el.appendChild(renderedComponent.$el);
      return;
    }

    el.app.mount(el);
  },
  disconnect: function (el) {
    el.app.$destroy(true);
  }
});
