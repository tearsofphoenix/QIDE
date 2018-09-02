import React, {PureComponent} from 'react'
import styles from './style.css'

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
      return <div className={styles['q-ctx-menu-splitter']} />
    } else {
      return (<div className={styles['q-ctx-menu-item']} onClick={action}>
        <div className={styles.head}>
          <span className={styles.icon}>{icon}</span>
          <span>{name}</span>
        </div>
        <span className={styles.tail}>{shortcut}</span>
      </div>)
    }
  }
}
