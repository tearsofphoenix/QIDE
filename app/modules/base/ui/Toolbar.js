import React, {PureComponent} from 'react'

type Props = {
  icons?: {icon: string, action: () => void}[],
  children: any
}

export default class Toolbar extends PureComponent<Props> {
  render() {
    const {icons = [], children} = this.props
    return (<div>
      {
        icons.map(({icon, action}) => <div key={icon} onClick={action}>{icon}</div>)
      }
      {children}
    </div>)
  }
}
