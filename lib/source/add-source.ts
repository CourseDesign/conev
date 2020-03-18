// eslint-disable-next-line no-unused-vars
import { Source } from './source';

function addSource(sources: Array<Source>, source: Source, priority: number = -1) {
  if (priority === -1) sources.push(source);
  else sources.splice(priority, 0, source);
}

export = addSource;
