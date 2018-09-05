import {ipcRenderer} from 'electron'
import context from '../../context'
import {kIPCEventTokenizeCode} from "../../../shared/constants"

export default function(fileName) {
  return [
    {
      name: "Tokenize",
      action: () => {
        const {getState} = context
        const current = getState('menu').context
        ipcRenderer.send(kIPCEventTokenizeCode, current.path)
      }
    }
  ]
}
