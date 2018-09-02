// @flow
import type {Author} from './author'
import type {Dependency} from './dependency'

export type Module = {
  id: string,
  name: string,
  version: string,
  author?: Author,
  dependencies?: Dependency
};
