import {kAppStore} from './constants'

export * from './constants'

const kSharedContext = {}

function set(key, value) {
  kSharedContext[key] = value
}

function get(key) {
  return kSharedContext[key]
}

function remove(key) {
  delete kSharedContext[key]
}

// redux state associated functions
/**
 *
 * @param {string} name
 */
function getState(name) {
  const store = get(kAppStore)
  return store.getState()[name]
}

export default {
  set,
  get,
  remove,
  getState
}
