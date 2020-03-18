export default function setConfig(config: object, key: string, value: any) {
  const path = key.trim().split('.');
  const parentPath = path.slice(0, path.length - 1);
  const name = path[path.length - 1];

  let parent = config;
  parentPath.forEach((token) => {
    parent = parent[token];
  });

  parent[name] = value;
}
