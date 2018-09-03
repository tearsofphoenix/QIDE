import type {Action} from '../../base/types/base'

type FileStateType = {
  files: Array
}

const initState = {
  files: []
}

export default function(state: FileStateType = initState, action: Action) {

}
