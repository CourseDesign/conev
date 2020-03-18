import { ConfigBuilder, JsonSource } from '../lib';

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
  const jsonSource = new JsonSource();

  jsonSource
    .setConfig('basic', basic)
    .setConfig('dev', dev)
    .setConfig('prd', prd);

  const builder = new ConfigBuilder();

  const config = await builder
    .setEnv({ basic: 'basic', current: 'dev' })
    .addSource(jsonSource)
    .build();

  console.log(config.get());
  console.log(config.get('a.b.c'));
}

main();
