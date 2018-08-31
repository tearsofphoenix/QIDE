import React from 'react';
import CodeMirror from 'react-codemirror'

require('../lib/codemirror/qasm')

export default class TextEditor extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="item-views" style={{ display: "block" }}>
        <div className="styleguide pane-item">
          <CodeMirror options={{theme: 'monokai', mode: 'qasm', lineNumbers: true, autofocus: true}} />
        </div>
      </div>
    );
  }
}
