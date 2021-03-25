import Vue from "vue";
import QuickStart from '../../src/QuickStart';

export default ({params}) => new Vue({
  render: h => h(QuickStart, {props: params})
});
