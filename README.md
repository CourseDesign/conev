# conev

Conev is a module that build environment variables from a `source` into `config`. Storing configuration in the environment separate from code is based on [The Twelve-Factor App](http://12factor.net/config) methodology.

![](https://img.shields.io/npm/dm/conev.png?style=flat-square)

​    

## Install

```shell
# with npm 
npm install conev
 
# or with Yarn 
yarn add conev
```

​    

## Usage

Get ConfigBuilder from conev and one or more Sources to use. In this example, the built-in JsonSource is used.

```typescript
import { ConfigBuilder, JsonSource } from 'conev';
```

And create Source and set up.

```typescript
const jsonSource = new JsonSource();

jsonSource    
    .setConfig('basic', basic) // basic is JSON
    .setConfig('dev', dev) // dev is JSON
    .setConfig('prd', prd); // prd is JSON
```

Create ConfigBuilder and set Environment, add source. (highest priority is added first).

```typescript
const builder = new ConfigBuilder();

builder
    .setEnv('dev', 'basic')
    .addSource(jsonSource);
```

Build configuration

```typescript
const config = await builder.build().refresh(); // This is the result of combining dev and basic.
```

Use configuration

```typescript
config.get() // The whole configuration created comes out
config.get('a.b.c'); // Is same as config.get().a.b.c
```

​    

## Config Builder

```typescript
class ConfigBuilder {
    setEnv(...env: string[]): ConfigBuilder;
    addEnv(...env: string[]): ConfigBuilder;
    addSource(source: Source, priority?: number): ConfigBuilder;

    build(): Config;
}
```

`ConfigBuilder` takes a configuration from the source and creates a new configuration according to the environment. `Env` and `Source` have priority. If priority is not defined, highest priority is added first.

​    

## Config

```typescript
class Config {
    constructor(sources: Source[], env: string[]);
    
    setEnv(...env: string[]): Config;
    addEnv(...env: string[]): Config;
    addSource(source: Source, priority?: number): Config;
    
    refresh(): Promise<Config>;
    validate(): void;
    
    get(key?: string): object;
    set(key: string, value: any): void;
}
```

`config` is a container for configuration. `config` is provided by creating a new configuration from the configuration and environment obtained from ` source`.

​    

## Source

```typescript
interface Source {
    export(): Promise<Map<string, object>>;
}
```

`Source` defines the source from which to get the configuration. Map is returned as the result value of `export`. The key of this map is environment and the value is the configuration when environment.

​    

## Json Source

```typescript
class JsonSource {
    constructor(map?: Map<string, object>);
    setConfig(env: string, ...values: object[]): JsonSource
    addConfig(env: string, ...values: object[]): JsonSource;
    removeConfig(env: string): JsonSource;
    export(): Promise<Map<string, object>>;
}

```

`JsonSource` defines the source from JSON. Use `setConfig` to add a configuration for a new environment or ` removeConfig` to delete a configuration. Map is returned as the result value of `export`. The key of this map is environment and the value is the configuration when environment.

​    

## Json File Source

```typescript
class JsonFileSource {
    constructor(fileMap?: Map<string, string>);
    setConfig(env: string, ...filenames: string[]): JsonFileSource;
    addConfig(env: string, ...filename: string[]): JsonFileSource;
    removeConfig(env: string): JsonFileSource;
    export(): Promise<Map<string, object>>;
}
```

`JsonFileSource` defines the source from JSON file. Use `setConfig` to add a configuration for a new environment or ` removeConfig` to delete a configuration. Map is returned as the result value of `export`. The key of this map is environment and the value is the configuration when environment.

​    

## Expansion

It can be extended by defining a new `Source`.
