import React, {PureComponent} from 'react'
import {Toolbar, Selector} from '../../base/ui'

const clearSelectStyle = {
  background: 'transparent',
  border: 'none'
}
export default class Statusbar extends PureComponent {
  render() {
    return (<div className="q-toolbar q-toolbar-footer" style={{height: '2em'}}>
      <div className="left">
        <Toolbar icons={[]} />
      </div>
      <div className="q-right">
        <div className="q-status-bar-item">11:14</div>
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
