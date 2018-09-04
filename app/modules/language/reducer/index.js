// @flow
import qasm from '@qiskit/qasm'
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
      const file = action.payload
      console.log(18, file)
      console.log('Version')
      console.log(qasm.version)

      const parser = new qasm.Parser()
      const json = parser.parse(file)
      console.log(json)
      return {...state, current: json}
    }
    default: {
      return state
    }
  }
}
