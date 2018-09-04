import React, {PureComponent} from 'react'
import {ipcRenderer} from 'electron'
import {connect} from 'react-redux'
import {Selector} from '../../base/ui'
import {register, removeListener, send} from '../../event'
import {kEventEditorCursorChanged, kIPCShowGotoLineDialog} from '../../event/constants'
import IconButton from '../../base/ui/IconButton'

const clearSelectStyle = {
  background: 'transparent',
  border: 'none'
}

type Props = {
  compress: boolean
}

class Statusbar extends PureComponent<Props> {
  constructor(props) {
    super(props)
    this.state = {}
    this.cursorListener = (eventID, cursor) => {
      this.setState({cursor})
    }
    register(kEventEditorCursorChanged, this.cursorListener)
  }

  componentWillUnmount() {
    removeListener(kEventEditorCursorChanged, this.cursorListener)
  }

  showGotolineDialog = () => {
    ipcRenderer.send(kIPCShowGotoLineDialog)
  }

  toggleExpand = () => {
    send('ide.core.core', 'toggleLayoutCompress')
  }

  render() {
    const {compress} = this.props
    const {cursor = {line: 0, ch: 0}} = this.state
    return (<div className="q-toolbar q-toolbar-footer q-mute" style={{height: '2em'}}>
      <div className="left">
        <IconButton style={{fontSize: '1.4em'}} icon={compress ? "expand" : "compress"} onClick={this.toggleExpand} />
      </div>
      <div className="q-right">
        <div className="q-status-bar-item q-mute" onClick={this.showGotolineDialog}>{cursor.line + 1} : {cursor.ch}</div>
        <div className="q-status-bar-item">
          <Selector style={clearSelectStyle} options={['LF', 'CRLF', 'CR']} />
        </div>
        <div className="q-status-bar-item">
          <Selector style={clearSelectStyle} options={['UTF-8', 'GB2312']} />
        </div>
      </div>
    </div>)
  }
}

export default connect(({core}) => ({compress: core.layout.compress}))(Statusbar)
