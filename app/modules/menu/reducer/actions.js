// @flow
import type {Position} from '../../base/types/position'

export const CONTEXTMENU_SHOW = 'CONTEXTMENU_SHOW'

export const CONTEXTMENU_HIDE = 'CONTEXTMENU_HIDE'

/**
 *
 * @param {Position} position
 * @return {Action}
 */
export function showContextMenu(position: Position) {
  return {
    type: CONTEXTMENU_SHOW,
    payload: position
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
