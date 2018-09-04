import React from 'react'
import CodeMirror from 'react-codemirror'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/dialog/dialog'
import 'codemirror/addon/display/rulers'
import 'codemirror/addon/search/jump-to-line'
import 'codemirror/addon/search/match-highlighter'
import 'codemirror/addon/search/matchesonscrollbar'
import 'codemirror/addon/search/search'
import 'codemirror/addon/search/searchcursor'
import 'codemirror/mode/javascript/javascript'

import fs from 'fs'
import {post} from '../../event'
import { guessModeFromFileName } from '../utils'
import { kEventEditorCursorChanged } from '../../event/constants'

require('../codemirror/qasm')

type Props = {
  tab: {path: string},
  activeTab: string | number,
  id: string | number,
  addEditorInstance: (CodeMirror, string | number) => void
}

export default class TextEditor extends React.PureComponent<Props> {
  componentDidMount() {
    const {id, addEditorInstance, tab} = this.props
    const file = fs.readFileSync(tab.path, { encoding: 'utf8' })
    const cm = this.codemirror.getCodeMirror()
    cm.setSize('100%', '100%')
    cm.setValue(file)
    cm.on('cursorActivity', (arg) => {
      console.log(arg, cm.getCursor())
      post(kEventEditorCursorChanged, cm.getCursor())
    })
    addEditorInstance(cm, id)
  }

  render() {
    const {tab, activeTab, id} = this.props
    const mode = guessModeFromFileName(tab.path)
    const options = {theme: 'monokai', mode, lineNumbers: true, autofocus: true}
    const style = { display: (activeTab === id ? 'block' : 'none' )}
    return (
      <div className="item-views" style={style}>
        <div className="styleguide pane-item">
          <CodeMirror className="q-editor" ref={(node) => this.codemirror = node} options={options} />
        </div>
      </div>
    )
  }
}
