function getConfig(config: object, key?: string): object {
  if (key === null) return config;

  let current = config;
  key.trim().split('.').forEach((token) => {
    current = current[token];
  });

  return current;
}

export = getConfig;
