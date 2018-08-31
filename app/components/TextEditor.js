import React from 'react'
import CodeMirror from 'react-codemirror'
import fs from 'fs'

require('../lib/codemirror/qasm')

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
