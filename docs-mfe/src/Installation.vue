<template>
  <div class="installation">
    <img alt="Vue logo" v-bind:src="logo">

    <h1>Welcome to ragu-vue-server-adapter documentation!</h1>

    <p>
      <strong>ragu-vue-server-adapter</strong> delivers an abstraction on top of <strong>ragu-server</strong> to
      enable a straightforward way to deliver your Vue.js components as micro-frontends.
    </p>

    <h2>About this documentation</h2>

    <p>This documentation is actually a micro-frontend wrote in vue using this adapter. Isn't is insane?</p>

    <ul>
      <li><strong>Micro-frontend</strong> <a href="http://ragu-vue-server-adapter.herokuapp.com/components/installation" target="_blank">http://ragu-vue-server-adapter.herokuapp.com/components/installation</a>.</li>
      <li><strong>Preview</strong> <a href="http://ragu-vue-server-adapter.herokuapp.com/preview/installation" target="_blank">http://ragu-vue-server-adapter.herokuapp.com/preview/installation</a></li>
      <li><strong>Repository</strong> <a href="https://github.com/ragu-framework/ragu-vue-server-adapter/tree/main/docs-mfe" target="_blank">https://github.com/ragu-framework/ragu-vue-server-adapter/tree/main/docs-mfe</a></li>
    </ul>

    Go through the next steps and check it out how easy it is to expose your components as micro-frontends.

    <h2>Installing Packages</h2>

    <p>
      You need to add <strong>ragu-server</strong> and <strong>ragu-vue-server-adapter</strong> as dependency of you vue app.
    </p>

    <p>
      <strong>ragu-server</strong> will expose your front-end as reusable widgets and the <strong>ragu-vue-server-adapter</strong> has a set of helpers to make the integration between ragu-server
      and vue more straightforward.
    </p>

    <CodeHighlight>npm install ragu-server ragu-vue-server-adapter</CodeHighlight>

    <p>You also need to add ragu-server scripts at your <strong>package.json</strong> scripts section.</p>

    <CodeHighlight>{
  "scripts": {
    "ragu:build": "ragu-server build ragu-config.js",
    "ragu:start": "ragu-server run ragu-config.js",
    "ragu:dev": "ragu-server dev ragu-config.js"
  }
}</CodeHighlight>

    <h2>Creating the configuration file</h2>

    <p>Create a <strong>ragu-config.js</strong> file with as bellow:</p>

    <CodeHighlight>const {createVueRaguServerConfig} = require('ragu-vue-server-adapter/config');

module.exports = createVueRaguServerConfig({
  compiler: {
    assetsPrefix: 'http://localhost:3100/component-assets/'
  },
  components: {
    namePrefix: 'my_project_name_'
  }
});</CodeHighlight>

    <ul>
      <li>
        <strong>compiler.assetsPrefix</strong>: Micro-frontends could be loaded at any domain.
        To make sure assets coulbe be reached by browser you must define which domain it will fetch assets.
      </li>

      <li><strong>compiler.namePrefix</strong>: Used to prevent micro-frontends name collision.</li>
    </ul>

    <p>
      There are a set of optional properties which you can override.
      All configurations described <a target="_blank" href="https://ragu-framework.github.io/ragu/interfaces/_src_config_.raguserverbaseconfig.html">here</a>
    </p>
    
    <h2>Exposing a component</h2>

    <p>
      Ragu uses a filesystem structure to expose micro-frontends.
      It means that any file into the <strong>ragu-components</strong> directory will be exposed as micro-frontend.
    </p>

    <h2>Rendering a simple component</h2>

    <CodeHighlight>import Vue from "vue";
import App from '../../src/App';

export default () => new Vue({
  render: h => h(App)
});</CodeHighlight>

    <p>Following the filesystem based-route the component will be available at</p>

    <ul>
      <li>
        <strong>Component route</strong>: http://you-ragu-server-host/components/ragu-components/hello-world/
      </li>
      <li>
        <strong>Preview route</strong>: http://you-ragu-server-host/components/ragu-components/hello-world/
      </li>
    </ul>

    <h2>Passing props to your micro-frontends</h2>

    <p>
      Props are passed to micro-frontends as request query parameters. The first argument of the exported function
      are the props received by server.
    </p>

    <CodeHighlight>import Vue from "vue";
import App from '../../src/App';

export default (props) => new Vue({
  render: h => h(App, { props } })
});</CodeHighlight>

    <ul>
      <li>
        <strong>Component route</strong>: http://you-ragu-server-host/components/ragu-components/hello-world/?name=World
      </li>
      <li>
        <strong>Preview route</strong>: http://you-ragu-server-host/components/ragu-components/hello-world/?name=World
      </li>
    </ul>

    <h2>Fetching async data</h2>

    <p>There is a problem that is hard to solve when the subject is Server Side Rendering: To know when a component finished it renders process.</p>

    <p>To make sure your component is fully render at the server we recommend to does not have async operations on component mount. Instead you can define a state function which will load any information your component requires it also prevent your component to load twice the same information as Ragu server exposes the state to the client.</p>

    <p>Create a file called <strong>state.js</strong> at your component directory with the follow structure:</p>

    <CodeHighlight>{`export default (props) => Promise.resolve({greeting: \`Hello, \${props.name}\`)`}</CodeHighlight>

    <p>And the state will be available to your component as the first parameter.</p>

    <CodeHighlight>import Vue from "vue";
import App from '../../src/App';

export default (_props, state) => new Vue({
  render: h => h(App, {props: state})
});</CodeHighlight>

    <p>And that's all!</p>
  </div>
</template>

<script>
import logo from '../../repository-assets/logo.png'
import CodeHighlight from "./components/CodeHighlight";

export default {
  name: 'App',
  components: {
    CodeHighlight
  },
  data: function() {
    return {
      logo,
      code: 'console.log("Hello World")'
    };
  }
}
</script>

<style scoped>
.installation {
  font-family: var(--default-font-family, 'Poppins', sans-serif);
  font-weight: 300;
  font-size: 0.875rem;
  line-height: 1.375;
}

h1 {
  font-family: var(--secondary-title-font-family, Lato, sans-serif);
  font-weight: var(--secondary-title-weight, 300);
  font-size: 1.5rem;
}

h2 {
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.625rem;
  font-family: var(--default-font-family, 'Poppins', sans-serif);
}

a {
  color: #BF265E;
}
</style>
