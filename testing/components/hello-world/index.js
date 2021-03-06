import HelloWorld from '../../testing-vue-project/src/components/HelloWorld';
import Vue from 'vue';

export default ({params}) => new Vue({
  render: h => h(HelloWorld, { props: {msg: params.name } }),
  destroyed() {
    window.stubVueDestroyed && window.stubVueDestroyed();
  }
});
