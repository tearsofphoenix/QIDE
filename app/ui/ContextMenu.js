import React, {PureComponent} from 'react'

type MenuProps = {
  children: []
}

export default class ContextMenu extends PureComponent<MenuProps> {
  render() {
    const {children} = this.props
    return (<div className="q-ctx-menu">{children}</div>)
  }
}
