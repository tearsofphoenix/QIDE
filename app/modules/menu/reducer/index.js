// @flow
import type {Action, Position} from '../../base/types/base'
import { CONTEXTMENU_SHOW, CONTEXTMENU_HIDE } from './actions'

export type MenuStateType = {
  show: boolean,
  position?: Position
}

const initState: MenuStateType = {
  show: false
}

export default function (state: ?MenuStateType = initState, action: Action) {
  switch (action.type) {
    case CONTEXTMENU_SHOW:
      return {...state, show: true, position: action.payload}
    case CONTEXTMENU_HIDE:
      return {...state, show: false}
    default:
      return state
  }
}
