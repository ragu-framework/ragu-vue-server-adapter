import Vue from "vue";
import QuickStart from '../../src/QuickStart';

export default (props) => new Vue({
  render: h => h(QuickStart, {props})
});
