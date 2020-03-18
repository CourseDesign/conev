// eslint-disable-next-line no-unused-vars
import { Environment } from '../environment/environment';

import integrateConfig = require('./integrate-config');
import getConfig = require('./get-config');
import setConfig = require('./set-config');

class Config {
  private value: object;

  constructor(
    map: Map<string, object>,
    environment: Environment,
  ) {
    const configs = [];

    configs.push(map.get(environment.basic));
    configs.push(map.get(environment.current));

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
export = Config;
