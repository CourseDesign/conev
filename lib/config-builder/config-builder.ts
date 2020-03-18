// eslint-disable-next-line no-unused-vars
import { Source } from '../source/source';
// eslint-disable-next-line no-unused-vars
import { Environment } from '../environment/environment';

import extractConfigFromSources from './extract-config-from-sources';
import addSource from '../source/add-source';
import Config from '../config/config';

export default class ConfigBuilder {
  private readonly sources: Array<Source>;

  private env: Environment;

  constructor(sources?: Array<Source>, env?: Environment) {
    this.sources = sources || [];
    this.env = env || { basic: 'basic', current: process.env.NODE_ENV };
  }

  setEnv(env: Environment): ConfigBuilder {
    this.env = env;

    return this;
  }

  setBasicEnv(env: string): ConfigBuilder {
    this.env.basic = env;

    return this;
  }

  setCurrentEnv(env: string): ConfigBuilder {
    this.env.current = env;

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
