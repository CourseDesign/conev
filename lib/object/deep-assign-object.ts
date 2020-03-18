function deepAssignObject(target: any, source: any): any {
  if (target === null || target === undefined) return source;
  if (source === null || source === undefined) return target;

  if (typeof target !== 'object') return source;
  if (typeof source !== 'object') return source;

  Object.entries(source).forEach(([key, value]) => {
    // eslint-disable-next-line no-param-reassign
    target[key] = deepAssignObject(target[key], value);
  });

  return target;
}

export = deepAssignObject;
