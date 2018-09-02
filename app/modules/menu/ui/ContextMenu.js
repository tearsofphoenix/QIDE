import React, {PureComponent} from 'react'
import styles from './style.css'

type MenuProps = {
  children: [],
  contextMenuPosition: ?{x: number, y: number}
}

export default class ContextMenu extends PureComponent<MenuProps> {
  render() {
    const {children, contextMenuPosition} = this.props
    const style = {
      position: 'absolute'
    }
    if (contextMenuPosition) {
      style.left = contextMenuPosition.x
      style.top = contextMenuPosition.y
    }
    return (<div className={styles['q-ctx-menu']} style={style}>{children}</div>)
  }
}
