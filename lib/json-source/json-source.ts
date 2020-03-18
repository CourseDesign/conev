// eslint-disable-next-line no-unused-vars
import { Source } from '../source/source';

class JsonSource implements Source {
  private readonly map: Map<string, object>;

  constructor(map?: Map<string, object>) {
    this.map = map || new Map<string, object>();
  }

  setEnv(env: string, value: object): JsonSource {
    this.map.set(env, value);

    return this;
  }

  removeJson(env: string, value: object): JsonSource {
    this.map.set(env, value);

    return this;
  }

  async build(): Promise<Map<string, object>> {
    return this.map;
  }
}

export = JsonSource;
