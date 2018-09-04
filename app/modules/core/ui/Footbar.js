import React, {PureComponent} from 'react'

type Props = {
  children?: any
}

export default class Footbar extends PureComponent<Props> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {children} = this.props
    return (<div className="q-toolbar q-toolbar-footer q-mute" style={{height: '2em'}}>
      <div className="left">
        {children}
      </div>
      <div className="q-right">
      </div>
    </div>)
  }
}
