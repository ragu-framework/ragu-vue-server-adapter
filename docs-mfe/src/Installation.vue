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
      You need to add <strong>ragu-server</strong> and <strong>ragu-react-server-adapter</strong> as dependency of you react app.
    </p>

    <p>
      <strong>ragu-server</strong> will expose your front-end as reusable widgets and the <strong>ragu-react-server-adapter</strong> has a set of helpers to make the integration between ragu-server
      and react more straightforward.
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
