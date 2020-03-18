import {ConfigBuilder, JsonSource} from '../lib';

const dev = {
  a: {
    b: {
      c: {
        value: 'c dev',
      },
    },
    value: 'a dev',
  },
};

const prd = {
  a: {
    b: {
      c: {
      },
    },
    value: 'a prd',
  },
};

const basic = {
  a: {
    b: {
      c: {
        value: 'c basic',
      },
      value: 'b basic',
    },
  },
};

async function main() {
  const jsonSource = new JsonSource()
    .setConfig('basic', basic)
    .setConfig('dev', dev)
    .setConfig('prd', prd);

  const builder = new ConfigBuilder()
    .setEnv({basic: 'basic', current: 'dev'})
    .addSource(jsonSource);

  const config = await builder.build();

  console.log(config.get());
  console.log(config.get('a.b.c'));
}

main();
