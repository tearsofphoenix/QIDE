// @flow
import type { Action } from '../../../reducers/types'
import { CONTEXTMENU_SHOW, CONTEXTMENU_HIDE } from './actions'
import type {Position} from '../../base/types/position'

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
