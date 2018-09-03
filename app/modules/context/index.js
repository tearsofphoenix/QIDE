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

export default {
  set,
  get,
  remove
}
