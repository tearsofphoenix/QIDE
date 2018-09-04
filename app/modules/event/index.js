import {get} from '../base'
import context from '../context'
import {kAppStore} from '../context/constants'

const kEventPool = {}

/**
 * @param {string} eventID
 * @param {function} callback
 */
export function register(eventID, callback) {
  let pool = kEventPool[eventID]
  if (!pool) {
    pool = new Set()
    kEventPool[eventID] = pool
  }
  pool.add(callback)
}

/**
 *
 * @param {string} eventID
 */
export function removeListener(eventID, callback) {
  const pool = kEventPool[eventID]
  if (pool) {
    pool.delete(callback)
  }
}

/**
 *
 * @param {string} eventID
 * @param {[]} args
 */
export function post(eventID, ...args) {
  const pool = kEventPool[eventID]
  if (pool) {
    pool.forEach(callback => callback(eventID, ...args))
  }
}

/**
 *
 * @param args
 */
export function send(...args) {
  const [id, action, ...rest] = args
  const module = get(id)
  if (module) {
    const {actions} = module
    const act = actions[action]
    if (typeof act === 'function') {
      const store = context.get(kAppStore)
      store.dispatch(act(...rest))
    } else {
      console.warn(`[module] action not found ${id} ${action}`)
    }
  } else {
    console.warn(`[module] not found ${id}`)
  }
}
