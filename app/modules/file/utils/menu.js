import fs from 'fs'
import {send} from '../../event'
import context from '../../context'

export default function(fileName) {
  return [
    {
      name: "Tokenize",
      action: () => {
        const {getState} = context
        const current = getState('menu').context
        console.log(11, current)
        const content = fs.readFileSync(current.path, {encoding: 'utf8'})
        send('ide.core.language', 'tokenize', content)
      }
    }
  ]
}
