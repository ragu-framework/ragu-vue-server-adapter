import {createVueRaguServerConfig} from "../config";

describe('Config', () => {
  it('does not set a default resolver when one was given', () => {
    const resolver: any = jest.fn();

    const config = createVueRaguServerConfig({
      components: {
        namePrefix: 'test_',
        resolver
      },
      compiler: {
        assetsPrefix: '/',
      }
    });

    expect(config.components.resolver).toBe(resolver);
  });

  it('does not set a default webpack view config when one was given', () => {
    const webpackView: any = {};

    const config = createVueRaguServerConfig({
      components: {
        namePrefix: 'test_',
      },
      compiler: {
        assetsPrefix: '/',
        webpack: {
          serverSide: webpackView
        }
      }
    });

    expect(config.compiler.webpack.serverSide).toBe(webpackView);
  });

  it('does not set a default webpack hydrate config when one was given', () => {
    const webpackHydrate = {};

    const config = createVueRaguServerConfig({
      environment: 'development',
      components: {
        namePrefix: 'test_',
      },
      compiler: {
        assetsPrefix: '/',
        webpack: {
          clientSide: webpackHydrate
        }
      }
    });

    expect(config.compiler.webpack.clientSide).toBe(webpackHydrate);
  });
});
