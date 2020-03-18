// eslint-disable-next-line no-unused-vars
import Source from '../source/source';

import extractConfigFromSources from './extract-config-from-sources';
import addSource from '../source/add-source';
import Config from '../config/config';

export default class ConfigBuilder {
  private readonly sources: Source[];

  private env: string[];

  constructor(sources?: Source[], env?: string[]) {
    this.sources = sources || [];
    this.env = env || [process.env.NODE_ENV as string, 'basic'];
  }

  setEnv(...env: string[]): ConfigBuilder {
    this.env = env;

    return this;
  }

  addEnv(...env: string[]): ConfigBuilder {
    this.env.push(...env);

    return this;
  }

  addSource(source: Source, priority: number = -1): ConfigBuilder {
    addSource(this.sources, source, priority);

    return this;
  }

  async build() {
    const config = await extractConfigFromSources(this.sources);

    return new Config(config, this.env);
  }
}
