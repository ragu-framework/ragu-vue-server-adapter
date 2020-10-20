import {RaguServerConfig, StateComponentResolver} from "ragu-server";
import * as path from 'path';
import * as fs from 'fs';

export class VueComponentResolver extends StateComponentResolver {
  hydrateResolver: string = path.join(__dirname, 'resolvers', 'hydrate-resolver');
  stateResolver: string = path.join(__dirname, 'resolvers', 'state-resolver');
  viewResolver: string = path.join(__dirname, 'resolvers', 'view-resolver');

  stateFileFor(componentName: string): string {
    return path.join(this.viewFileFor(componentName), 'state');
  }

  viewFileFor(componentName: string): string {
    return path.join(this.config.components.sourceRoot, componentName);
  }

  hydrateFileFor(componentName: string): string {
    return this.viewFileFor(componentName);
  }

  constructor(config: RaguServerConfig) {
    super(config);
  }

  async stateTemplate(componentPath: string) {
    const files: string[] = await fs.promises.readdir(componentPath);
    const statePath = path.join(componentPath, 'state');

    const fileExists = files.find((filename) => {
      const extension = path.extname(filename);

      return filename.replace(extension, '').toLowerCase() === 'state';
    });

    if (!fileExists) {
      return 'null';
    }

    return `await require('${statePath}').default(props)`
  }
}
