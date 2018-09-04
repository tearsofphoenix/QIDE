import {ipcRenderer} from 'electron'
import * as actions from './reducer/actions'
import reducer from './reducer'
import {load} from '../base'
import moduleInfo from './module.json'
import {kIPCEventTokenizeCode} from "../../shared/constants"

export default function(ctx) {
  load({actions, ...moduleInfo}, reducer, ctx)

  ipcRenderer.on(kIPCEventTokenizeCode, (event, result) => {
    console.log(12, result)
  })
}
