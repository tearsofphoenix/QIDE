import React, {PureComponent} from 'react'

type Props = {
  icons?: {icon: string, action: () => void}[],
  direction?: 'vertical' | 'horizontal',
  children: any
}

export default class Toolbar extends PureComponent<Props> {
  render() {
    const {icons = [], direction = 'horizontal', children} = this.props
    const style = {
      display: 'flex',
      flexDirection: direction === 'vertical' ? 'row' : 'column'
    }
    return (<div style={style}>
      {
        icons.map(({icon, action}) => <div key={icon} onClick={action}>{icon}</div>)
      }
      {children}
    </div>)
  }
}
