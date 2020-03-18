// eslint-disable-next-line no-unused-vars
import { Source } from './source';

function addSource(sources: Array<Source>, source: Source, priority: number = -1) {
  if (priority === -1) sources.push(source);
  else {
    const moveSources = sources.slice(priority, sources.length);
    sources.push(source);
    sources.push(...moveSources);
  }
}

export = addSource;
