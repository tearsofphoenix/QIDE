// @flow
import type {Module} from './types/module'

const kModules = {}

/**
 *
 * @param {Module} moduleInfo
 * @param {function} reducer
 * @param context
 */
export function load(moduleInfo: Module, reducer, context) {
  const {name, id} = moduleInfo
  const {reducers} = context
  let m = reducers[name]
  if (m) {
    console.warn(`[module] already loaded ${name}`)
  }
  reducers[name] = reducer

  const obj = {...moduleInfo, reducer}
  kModules[name] = obj
  kModules[id] = obj
}

/**
 *
 * @param {string} nameOrID
 * @return {Module}
 */
export function get(nameOrID: string) {
  return kModules[nameOrID]
}

/**
 *
 * @param {string} nameOrID
 */
export function remove(nameOrID: string) {
  const m = kModules[nameOrID]
  if (!m) {
    console.warn(`[module] try to remove a not loaded module: ${nameOrID} `)
  }
  delete kModules[nameOrID]
}
