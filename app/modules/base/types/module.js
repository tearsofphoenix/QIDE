// @flow
export type Author = {
  name: string,
  email?: string,
  url?: string
}

export type Dependency = {
  [string]: string
}

export type Module = {
  id: string,
  name: string,
  version: string,
  author?: Author,
  dependencies?: Dependency
};
