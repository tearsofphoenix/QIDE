// @flow
import type {Position} from '../../base/types/base'

export const CONTEXTMENU_SHOW = 'CONTEXTMENU_SHOW'

export const CONTEXTMENU_HIDE = 'CONTEXTMENU_HIDE'

/**
 *
 * @param {Position} position
 * @param {[]} current menu config
 * @return {Action}
 */
export function showContextMenu(position: Position, current, context) {
  return {
    type: CONTEXTMENU_SHOW,
    payload: {position, current, context}
  }
}

/**
 *
 * @return {Action}
 */
export function hideContextMenu() {
  return {
    type: CONTEXTMENU_HIDE
  }
}
