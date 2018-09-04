import type { Action } from '../../base/types/base';
import { CORE_LAYOUT_TOGGLE_COMPRESS } from './actions';

type CoreStateType = {
  layout: {compress: boolean}
}

const initState = {
  layout: {
    compress: false
  }
}

export default function(state: CoreStateType = initState, action: Action) {
  switch (action.type) {
    case CORE_LAYOUT_TOGGLE_COMPRESS: {
      const result = {...state}
      result.layout.compress = !result.layout.compress
      return result
    }
    default: {
      return state
    }
  }
}
