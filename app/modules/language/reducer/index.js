// @flow

import type { Action } from '../../base/types/base'
import { LANGUAGE_TOKENIZE } from './actions'

type LanguageStateType = {
  current?: any
};

const initState = {

}

export default function(state: LanguageStateType = initState, action: Action) {
  switch (action.type) {
    case LANGUAGE_TOKENIZE: {
      return {...state}
    }
    default: {
      return state
    }
  }
}
