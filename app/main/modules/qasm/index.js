// @flow
import {ipcMain} from 'electron'
import fs from "fs"
import qasm from "@qiskit/qasm"
import {kIPCEventTokenizeCode} from "../../../shared/constants"

export default function (ctx) {
  ipcMain.on(kIPCEventTokenizeCode, (event, path) => {
    try {
      const content = fs.readFileSync(path, {encoding: 'utf8'})
      const parser = new qasm.Parser()
      const json = parser.parse(content)
      console.log(12, json)
      event.sender.send(kIPCEventTokenizeCode, {file: path, result: json})
    } catch (e) {
      console.log(e.message, e.stack)
      event.sender.send(kIPCEventTokenizeCode, {file: path, error: e.message})
    }
  })
}
