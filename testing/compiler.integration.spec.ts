import {ComponentsCompiler, RaguServerConfig, ServerSideCompiler} from "ragu-server";
import {createTestConfig} from "./test-config-factory";
import {VueComponentResolver} from "../component-resolver";
import jsdom, {ConstructorOptions} from "jsdom";
import fs from "fs";
import {ComponentRenderService} from "ragu-server/src/services/component-render-service";

describe('Compiler Integration Test', () => {
  describe('View Compilation', () => {
    let compiler: ServerSideCompiler;
    let config: RaguServerConfig;

    beforeAll(async () => {
      config = await createTestConfig();
      config.components.resolver = new VueComponentResolver(config);

      compiler = new ServerSideCompiler(config);
      await compiler.compileAll();
    });

    it('renders the vue component', async () => {
      const componentPath = compiler.compiledComponentPath('hello-world');

      const renderResult = await new ComponentRenderService(config)
          .renderComponent('hello-world', [], componentPath, "http://", {name: 'Hello, World!'}, {} as any);

      expect(renderResult.html).toContain('Hello, World!');
      expect(renderResult.html).toContain('For a guide and recipes on how to configure / customize this project');
    });

    it('renders the vue component with a state', async () => {
      const componentPath = compiler.compiledComponentPath('hello-world-state');

      const renderResult = await new ComponentRenderService(config)
          .renderComponent('hello-world', [], componentPath, "http://", {name: 'World'}, {} as any);

      expect(renderResult.state).toEqual({msg: 'Hello, World!'});
      expect(renderResult.html).toContain('Hello, World!');
      expect(renderResult.html).toContain('For a guide and recipes on how to configure / customize this project');
    });

    describe('using the deprecated api', () => {
      it('renders the vue component', async () => {
        const componentPath = compiler.compiledComponentPath('hello-world-deprecated');

        const renderResult = await new ComponentRenderService(config)
            .renderComponent('hello-world-deprecated', [], componentPath, "http://", {name: 'Hello, World!'}, {} as any);

        expect(renderResult.html).toContain('Hello, World!');
        expect(renderResult.html).toContain('For a guide and recipes on how to configure / customize this project');
      });

      it('renders the vue component with a state', async () => {
        const componentPath = compiler.compiledComponentPath('hello-world-state-deprecated');

        const renderResult = await new ComponentRenderService(config)
            .renderComponent('hello-world-deprecated', [], componentPath, "http://", {name: 'World'}, {} as any);

        expect(renderResult.state).toEqual({msg: 'Hello, World!'});
        expect(renderResult.html).toContain('Hello, World!');
        expect(renderResult.html).toContain('For a guide and recipes on how to configure / customize this project');
      });
    });
  });

  describe('Hydrate Compilation', () => {
    let compiler: ComponentsCompiler;
    let config: RaguServerConfig;
    let dom: jsdom.JSDOM;


    beforeAll(async () => {
      config = await createTestConfig();
      config.components.resolver = new VueComponentResolver(config);

      compiler = new ComponentsCompiler(config);
      await compiler.compileAll();
    });

    beforeEach(() => {
      const options: ConstructorOptions = {
        url: config.compiler.assetsPrefix,
        resources: 'usable',
        runScripts: 'dangerously',
      }
      dom = new jsdom.JSDOM(undefined, options);

      (global as any).window = dom.window;
      (global as any).btoa = dom.window.btoa;
      (global as any).document = dom.window.document;
    });

    const evalCompiledClient = async (componentName: string) => {
      const url = new URL(await compiler.getClientFileName(componentName));
      const client = fs.readFileSync(url as any).toString();
      eval(client);
    }

    it('hydrate compiled component into window', async () => {
      await evalCompiledClient('hello-world');

      const resolvedComponent = (window as any)['test_components_hello-world'].default;
      const div = dom.window.document.createElement('div');

      const componentPath = compiler.compiledViewComponentPath('hello-world');

      const renderResult = await new ComponentRenderService(config)
          .renderComponent('hello-world', [], componentPath, "http://", {name: 'Hello, World!'}, {} as any);

      div.innerHTML = renderResult.html;
      dom.window.document.body.appendChild(div);

      await resolvedComponent.hydrate(div, {name: 'Hello, World'});

      expect(div.textContent).toContain('Hello, World');
      expect(div.textContent).toContain('For a guide and recipes on how to configure / customize this project');
      expect(div.querySelector('[data-server-rendered]')).toBeNull();
    });

    it('renders the component', async () => {
      await evalCompiledClient('hello-world');

      const resolvedComponent = (window as any)['test_components_hello-world'].default;
      const div = dom.window.document.createElement('div');

      await resolvedComponent.render(div, {name: 'Hello, World'});

      expect(div.textContent).toContain('Hello, World');
      expect(div.textContent).toContain('For a guide and recipes on how to configure / customize this project');
    });

    it('rehydrates state', async () => {
      await evalCompiledClient('hello-world-state');

      const resolvedComponent = (window as any)['test_components_hello-world-state'].default;
      const div = dom.window.document.createElement('div');

      const componentPath = compiler.compiledViewComponentPath('hello-world-state');

      const renderResult = await new ComponentRenderService(config)
          .renderComponent('hello-world', [], componentPath, "http://", {name: 'Hello, World!'}, {} as any);

      div.innerHTML = renderResult.html;
      dom.window.document.body.appendChild(div);

      await resolvedComponent.hydrate(div, {name: 'World'}, {msg: 'Hello, World'});

      expect(div.textContent).toContain('Hello, World');
      expect(div.textContent).toContain('For a guide and recipes on how to configure / customize this project');
    });

    it('destroys component', async () => {
      await evalCompiledClient('hello-world');

      const resolvedComponent = (window as any)['test_components_hello-world'].default;
      const div = dom.window.document.createElement('div');

      await resolvedComponent.hydrate(div, {name: 'Hello, World'});

      // @ts-ignore
      window.stubVueDestroyed = jest.fn();
      resolvedComponent.disconnect(div);

      // @ts-ignore
      expect(window.stubVueDestroyed).toBeCalled();
    });

    describe('using the legacy api', () => {
      it('hydrate compiled component into window', async () => {
        await evalCompiledClient('hello-world-deprecated');

        const resolvedComponent = (window as any)['test_components_hello-world-deprecated'].default;
        const div = dom.window.document.createElement('div');

        const componentPath = compiler.compiledViewComponentPath('hello-world-deprecated');

        const renderResult = await new ComponentRenderService(config)
            .renderComponent('hello-world-deprecated', [], componentPath, "http://", {name: 'Hello, World!'}, {} as any);

        div.innerHTML = renderResult.html;
        dom.window.document.body.appendChild(div);

        await resolvedComponent.hydrate(div, {name: 'Hello, World'});

        expect(div.textContent).toContain('Hello, World');
        expect(div.textContent).toContain('For a guide and recipes on how to configure / customize this project');
        expect(div.querySelector('[data-server-rendered]')).toBeNull();
      });

      it('renders the component', async () => {
        await evalCompiledClient('hello-world-deprecated');

        const resolvedComponent = (window as any)['test_components_hello-world-deprecated'].default;
        const div = dom.window.document.createElement('div');

        await resolvedComponent.render(div, {name: 'Hello, World'});

        expect(div.textContent).toContain('Hello, World');
        expect(div.textContent).toContain('For a guide and recipes on how to configure / customize this project');
      });

      it('rehydrates state', async () => {
        await evalCompiledClient('hello-world-state-deprecated');

        const resolvedComponent = (window as any)['test_components_hello-world-state-deprecated'].default;
        const div = dom.window.document.createElement('div');

        const componentPath = compiler.compiledViewComponentPath('hello-world-state-deprecated');

        const renderResult = await new ComponentRenderService(config)
            .renderComponent('hello-world-deprecated', [], componentPath, "http://", {name: 'Hello, World!'}, {} as any);

        div.innerHTML = renderResult.html;
        dom.window.document.body.appendChild(div);

        await resolvedComponent.hydrate(div, {name: 'World'}, {msg: 'Hello, World'});

        expect(div.textContent).toContain('Hello, World');
        expect(div.textContent).toContain('For a guide and recipes on how to configure / customize this project');
      });

      it('destroys component', async () => {
        await evalCompiledClient('hello-world-deprecated');

        const resolvedComponent = (window as any)['test_components_hello-world-deprecated'].default;
        const div = dom.window.document.createElement('div');

        await resolvedComponent.hydrate(div, {name: 'Hello, World'});

        // @ts-ignore
        window.stubVueDestroyed = jest.fn();
        resolvedComponent.disconnect(div);

        // @ts-ignore
        expect(window.stubVueDestroyed).toBeCalled();
      });

      it('destroys component by renders', async () => {
        await evalCompiledClient('hello-world-deprecated');

        const resolvedComponent = (window as any)['test_components_hello-world-deprecated'].default;
        const div = dom.window.document.createElement('div');

        await resolvedComponent.render(div, {name: 'Hello, World'});

        // @ts-ignore
        window.stubVueDestroyed = jest.fn();
        resolvedComponent.disconnect(div);

        // @ts-ignore
        expect(window.stubVueDestroyed).toBeCalled();
      });
    });
  });
});
