import {ipcRenderer} from 'electron'
import type {Action} from '../../base/types/base'
import {FILE_CREATE, FILE_RENAME, FILE_REMOVE} from './actions'
import {kIPCFileCreate} from '../../event/constants'

type FileStateType = {
  files: Array
};

const initState = {
  files: []
}

export default function(state: FileStateType = initState, action: Action) {
  switch (action.type) {
    case FILE_CREATE: {
      ipcRenderer.send(kIPCFileCreate, action.payload)
      return state
    }
    case FILE_RENAME: {
      return state
    }
    case FILE_REMOVE: {
      return state
    }
    default: {
      return state
    }
  }
}
