const Vue = require("vue");

function getVueApp (component) {
  if (Vue.createApp) {
    return Vue.createApp(component);
  }

  return component;
}


module.exports = (component) => ({
  hydrate: function (element, params, state) {
    element.app = getVueApp(component({...params, params, state, element, isServer: false}, state));

    if (element.app.$mount) {
      element.app.$mount(element.querySelector('[data-server-rendered]'));

      return;
    }

    element.app.mount(element.querySelector('[data-server-rendered]'));
  },
  render: function (element, params, state) {
    element.app = getVueApp(component({...params, params, state, element, isServer: false}, state));

    if (element.app.$mount) {
      var renderedComponent = element.app.$mount();
      element.appendChild(renderedComponent.$el);
      return;
    }

    element.app.mount(element);
  },
  disconnect: function (el) {
    el.app.$destroy(true);
  }
});
