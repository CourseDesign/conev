// eslint-disable-next-line no-unused-vars
import { Source } from '../source/source';
import integrateConfig from '../config/integrate-config';

// eslint-disable-next-line max-len
export default async function extractConfigFromSources(sources: Array<Source>): Promise<Map<string, object>> {
  const configs = await Promise.all(sources.map((source) => source.build()));
  const configsMap = new Map<string, Array<object>>();

  configs.forEach((config) => {
    config.forEach((value, key) => {
      if (!configsMap.has(key)) configsMap.set(key, []);
      configsMap.get(key).push(value);
    });
  });

  const configMap = new Map<string, object>();
  configsMap.forEach((value, key) => {
    configMap.set(key, integrateConfig(value));
  });

  return configMap;
}
