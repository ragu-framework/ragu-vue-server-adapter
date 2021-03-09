<template>
  <div class="wrapper">
    <link
        v-if="isDevelopment"
        href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300&family=Poppins:wght@300;500&display=swap&family=Source+Code+Pro:wght@1;300"
        rel="stylesheet"/>

    <div class="main-content">
      <hgroup class="title-wrapper">
        <h2>Exposing Micro-frontends</h2>
        <img src="./assets/logo.png" alt="" width="70" height="70">
      </hgroup>

      <CommandItem>
        <span slot="number">1</span>
        <div slot="description">
          <p>
            Install <a href="https://github.com/ragu-framework/ragu-cli" target="_blank">ragu-cli</a> and
            <a href="https://github.com/ragu-framework/ragu-vue-server-adapter" target="_blank">ragu-vue-server-adapter</a>
          </p>
        </div>
        <div slot="action">
          <GreenCodeHighlight>npm install ragu-cli ragu-vue-server-adapter</GreenCodeHighlight>
        </div>
      </CommandItem>

      <CommandItem>
        <span slot="number">2</span>
        <div slot="description">
          <p>Create a file that exports a default function that returns your Vue Component.</p>
        </div>
        <div slot="action">
          <GreenCodeHighlight>{{actionExport}}</GreenCodeHighlight>
        </div>
      </CommandItem>

      <CommandItem>
        <span slot="number">3</span>
        <div slot="description">
          <p>Start the development server providing the file previously created.</p>
        </div>
        <div slot="action">
          <GreenCodeHighlight>npx ragu-cli dev --file my-mfe.jsx</GreenCodeHighlight>
        </div>
      </CommandItem>

      <h2>Consuming a Micro-frontend</h2>

      <CommandItem>
        <span slot="number">1</span>
        <div slot="description">
          <div class="info-text">
            <p>VueJs does not have a client yet 😢! It will come soon.</p>
            <p>Do you think that could help to create? Take a look at this issue: <a href="https://github.com/ragu-framework/ragu/issues/11">https://github.com/ragu-framework/ragu/issues/11</a></p>
          </div>

          <p>For while you can use the <mark>ragu-component</mark> custom element that works no matter with framework you are using.</p>

          <p>
            For that, all you need to do is to give an <mark>src</mark> attribute to <mark>ragu-component</mark>.
            The same way you would do with an iframe.
          </p>
          <p>
            The props parameter received by a Ragu
            Micro-frontend are provided through query parameters.</p>
        </div>
        <div slot="action">
          <GreenCodeHighlight>{{ usingComponentTask }}</GreenCodeHighlight>
        </div>
      </CommandItem>

      <h2>Deploying 🚀</h2>
      <div class="info-text">
        <p>
          There are two ways of publishing your micro-frontend:
        </p>
        <p>
          You can deploy as a simple <strong>static project</strong> to your favorite CDN or ir can use <strong>ragu
          server</strong> to publish your micro-frontends.
        </p>
      </div>

      <h3>Static Deploy</h3>

      <CommandItem>
        <span slot="number">1</span>
        <div slot="description">
          <h4>Building:</h4>
          <p>To deploy a Micro-frontend you must define the <mark>--baseurl</mark>. That's because ragu needs to know
            where to fetch all the project assets.
          </p>
        </div>
        <div slot="action">
          <GreenCodeHighlight>{{ staticDeployTask }}</GreenCodeHighlight>
        </div>
      </CommandItem>

      <CommandItem>
        <span slot="number">2</span>
        <div slot="description">
          <h4>Deploying:</h4>
          <p>
            A directory called <mark>.ragu-components/</mark> will be created. you must deploy the application in a
            way where the defined <mark>baseurl</mark> resolves the <mark>.ragu-components/</mark> content.
          </p>
        </div>
      </CommandItem>

      <CommandItem>
        <span slot="number">3</span>
        <div slot="description">
          <h4>Consuming:</h4>
          <p>
            A json with the same name of your <mark>--file</mark> will be created at <mark>.ragu-components/</mark>.
          </p>
          <p>You must use this json to fetch your micro-frontend using the ragu-client</p>
          <p>⚠️ Don't forget the <mark>.json</mark> extension. That's how Ragu knows it is a static micro-frontend.</p>
        </div>
        <div slot="action">
          <GreenCodeHighlight>{{ consumingStatic }}</GreenCodeHighlight>
        </div>
      </CommandItem>

      <h3>Ragu Server Deploy</h3>

      <CommandItem>
        <span slot="number">1</span>
        <div slot="description">
          <h4>Building:</h4>
          <p>To deploy a Micro-frontend you must define the <mark>--baseurl</mark>. That's because ragu needs to know
            where to fetch all the project assets.</p>
          <p>You can also provide an <mark>--port</mark> option to define the port ragu-server must run.</p>
        </div>
        <div slot="action">
          <GreenCodeHighlight>{{ raguServerBuildTask }}</GreenCodeHighlight>
        </div>
      </CommandItem>

      <CommandItem>
        <span slot="number">2</span>
        <div slot="description">
          <h4>Serving:</h4>
          <p>
            It is strictly necessary to give the same arguments provided to <mark>build</mark> command.
          </p>
          <p>
            This ragu-server instance must be listen to requests from the defined <mark>--baseurl</mark>
          </p>
        </div>
        <div slot="action">
          <GreenCodeHighlight>{{ raguServerRunTask }}</GreenCodeHighlight>
        </div>
      </CommandItem>

      <CommandItem>
        <span slot="number">2</span>
        <div slot="description">
          <h4>Consuming:</h4>
          <p>The <mark>serve</mark> command output will provide the URL that you must use to fetch your micro-frontend.</p>
        </div>
        <div slot="action">
          <GreenCodeHighlight>{{ usingComponentServeTask }}</GreenCodeHighlight>
        </div>
      </CommandItem>
    </div>
  </div>
</template>

<script>
import CommandItem from "@/components/CommandItem";
import GreenCodeHighlight from "@/components/GreenCodeHighlight";

const gt = '<';
const lt = '>'

const usingComponentTask = `${gt}script src="https://cdn.jsdelivr.net/npm/ragu-dom@latest/install.js"${lt}${gt}/script${lt}

<ragu-component
 src="http://localhost:3100/?name=World">
</ragu-component>`

const usingComponentServeTask = `
<ragu-component
 src="https://cdn.com/path/my-mfe?name=World">
</ragu-component>
`

const staticDeployTask = `npx ragu-cli static --file my-mfe.jsx \\
  --host https://cdn.com/path/`;

const raguServerBuildTask = `npx ragu-cli build --file my-mfe.jsx \\
  --host https://cdn.com/path/`;

const raguServerRunTask = `npx ragu-cli serve --file my-mfe.jsx \\
  --host https://cdn.com/path/`;

const consumingStatic = `<ragu-component
  src="https://cdn.com/path/my-mfe.json?name=World">
</ragu-component>`;

const actionExport = `import Vue from "vue";
import HelloWorld from '../../src/HelloWorld';

export default (props) => new Vue({
render: h => h(HelloWorld, {props})
});
`;

export default {
  name: 'QuickStart',
  props: ['env'],
  data: function () {

    return {
      actionExport,
      staticDeployTask,
      raguServerBuildTask,
      raguServerRunTask,
      consumingStatic,
      usingComponentTask,
      usingComponentServeTask
    }
  },
  computed: {
    isDevelopment: function () {
      return this.env === 'dev'
    }
  },
  components: {
    CommandItem: CommandItem,
    GreenCodeHighlight: GreenCodeHighlight
  }
}
</script>
<style scoped lang="scss">
.wrapper {
  background: #2B3332;
  padding: 110px 0;
  font-family: Poppins, sans-serif;
  font-weight: 300;
  font-size: 20px;
  color: white;

  * {
    box-sizing: border-box;
  }

  h1, h2, h3, h4 {
    margin: 0;
  }
}

.main-content {
  max-width: 80%;
  margin: 0 auto;

  @media (max-width: 1400px) {
    max-width: 95%;
  }
}

.title-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    @media (max-width: 900px) {
      display: none;
    }
  }
}

.info-text {
  margin: 20px 0;
  color: rgba(255, 255, 255, 0.75);
}

h2 {
  font-weight: bold;
  font-size: 48px;
}

h3 {
  font-weight: bold;
  font-size: 36px;
  margin-top: 40px;
  color: #FFFFFF;
}

a, mark {
  color: #41B883;
  background: none;
}

mark {
  white-space: nowrap;
}
</style>
