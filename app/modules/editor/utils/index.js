/**
 *
 * @param {string} fileName
 */
import { fileExtension } from '../../base/lib'

const kModeList = [
  {
    mode: 'qasm',
    match: (ext) => /qasm/i.test(ext)
  },
  {
    mode: 'javascript',
    match: (ext) => /(js|jsx)/i.test(ext)
  },
  {
    mode: 'go',
    match: (ext) => /go/i.test(ext)
  }
]

export function guessModeFromFileName(fileName) {
  const ext = fileExtension(fileName)
  const ret = kModeList.find(({match}) => match(ext))
  return ret.mode
}
