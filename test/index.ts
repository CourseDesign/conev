import { ConfigBuilder, JsonSource } from '../lib';

const dev = {
  a: {
    b: {
    },
    e: new Array<string>('dev'),
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
        value: undefined,
      },
      value: 'b basic',
    },
    e: new Array<string>('basic'),
  },
};

async function main() {
  const jsonSource = new JsonSource()
    .setConfig('basic', basic)
    .setConfig('dev', dev)
    .setConfig('prd', prd);

  const builder = new ConfigBuilder()
    .setEnv('dev', 'basic')
    .addSource(jsonSource);

  const config = await builder.build().refresh();

  // config.validate();

  console.log(JSON.stringify(config.get()));
  console.log(JSON.stringify(config.get('a.b.c')));
}

main();
