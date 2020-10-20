import HelloWorld from '../../testing-vue-project/src/components/HelloWorld';
import Vue from 'vue';

export default (_, state) => Promise.resolve(new Vue({
  render: h => h(HelloWorld, { props: state })
}));
