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

import fs from 'fs'

require('../codemirror/qasm')

type Props = {
  tab: {path: string},
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
    addEditorInstance(cm, id)
  }

  render() {
    const options = {theme: 'monokai', mode: 'qasm', lineNumbers: true, autofocus: true}
    return (
      <div className="item-views" style={{ display: "block" }}>
        <div className="styleguide pane-item">
          <CodeMirror className="q-editor" ref={(node) => this.codemirror = node} options={options} />
        </div>
      </div>
    )
  }
}
