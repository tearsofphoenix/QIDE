import React, {PureComponent} from 'react'

type Props = {
  icon: void | string,
  name: void | string,
  shortcut: void | string,
  action: void | () => void,
  splitter: void | boolean
}

export default class ContextMenuItem extends PureComponent<Props> {
  render() {
    const {icon, name, shortcut, action, splitter} = this.props
    if (splitter) {
      return <div className="q-ctx-menu-splitter" />
    } else {
      return (<div className="q-ctx-menu-item" onClick={action}>
        <div>
          <span>{icon}</span>
          <span>{name}</span>
        </div>
        <span>{shortcut}</span>
      </div>)
    }
  }
}
