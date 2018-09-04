import React from 'react'
import Toolbar from '../../../base/ui/Toolbar'
import IconButton from '../../../base/ui/IconButton'
import styles from './styles.css'

type Props = {
  show?: boolean
}

export default class RunView extends React.Component<Props> {
  runCurrentTask = () => {

  }

  stopCurrentTask = () => {

  }

  render() {
    const {show} = this.props
    return (<div className={styles.wrapper} style={{display: show ? 'flex' : 'none'}}>
      <div className={styles.header}>
        <div></div>
        <Toolbar>
          <IconButton icon="angle-double-down" />
        </Toolbar>
      </div>
      <div className={styles['content-wrapper']}>
        <Toolbar>
          <IconButton icon="play" onClick={this.runCurrentTask} />
          <IconButton icon="stop" onClick={this.stopCurrentTask} />
        </Toolbar>
        <div className={styles.content}></div>
      </div>
    </div>)
  }
}
