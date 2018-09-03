import type { IndexPath } from '../types/base'

/**
 *
 * @param {any} array
 * @param {?IndexPath} indexPath
 * @param {?string} field
 * @return {any}
 */
export function getElementAt(array, indexPath: ?IndexPath = [], field: ?string) {
  let looper = array
  if (indexPath.length > 0) {
    if (typeof field !== 'undefined') {
      looper = looper[field]
      const len = indexPath.length
      indexPath.forEach((idx, i) => {
        looper = looper[idx]
        if (i !== len - 1) {
          looper = looper[field]
        }
      })
    } else {
      indexPath.forEach((idx) => looper = looper[idx])
    }
  }
  return looper
}
