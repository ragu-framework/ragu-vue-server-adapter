module.exports = (component) => ({
  hydrate: function (el, props, state) {
    el.app = component(props, state);
    el.app.$mount(el.querySelector('[data-server-rendered]'));
  },
  render: function (el, props, state) {
    el.app = component(props, state);
    var renderedComponent = el.app.$mount();
    el.appendChild(renderedComponent.$el);
  },
  disconnect: function (el) {
    el.app.$destroy(true);
  }
});
