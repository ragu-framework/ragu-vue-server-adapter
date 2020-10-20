module.exports = (component) => ({
  hydrate: function (el, props, state) {
    this.app = component(props, state);
    this.app.$mount(el.firstChild);
  },
  disconnect: function () {
    this.app.$destroy(true);
  }
});
