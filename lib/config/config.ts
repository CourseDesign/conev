// eslint-disable-next-line no-unused-vars
import integrateConfig from './integrate-config';
import getConfig from './get-config';
import setConfig from './set-config';

export default class Config {
  private value: object;

  constructor(
    map: Map<string, object>,
    envs: string[],
  ) {
    const configs = envs.map((env) => map.get(env));

    this.value = integrateConfig(configs);
  }

  get(key: string = null): object {
    return getConfig(this.value, key);
  }

  set(key: string, value: any) {
    if (key === null) this.value = value;

    setConfig(this.value, key, value);
  }
}
