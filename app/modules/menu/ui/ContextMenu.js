import React, {PureComponent} from 'react'
import styles from './style.css'
import type { Position } from '../../base/types/position'

type MenuProps = {
  children: [],
  position: Position
}

export default class ContextMenu extends PureComponent<MenuProps> {
  render() {
    const {children, position} = this.props
    const style = {
      position: 'absolute'
    }
    if (position) {
      style.left = position.x
      style.top = position.y
    }
    return (<div className={styles['q-ctx-menu']} style={style}>{children}</div>)
  }
}
