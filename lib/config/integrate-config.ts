import deepAssignObject = require('../object/deep-assign-object');

function integrateConfig(configs: Array<object>): object {
  return configs.reverse().reduce((pre, curr) => deepAssignObject(pre, curr), {});
}

export = integrateConfig;
