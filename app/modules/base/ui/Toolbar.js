import React, {PureComponent} from 'react'

type Props = {
  icons: {icon: string, action: () => void}[]
}

export default class Toolbar extends PureComponent<Props> {
  render() {
    const {icons = []} = this.props
    return (<div>
      {
        icons.map(({icon, action}) => <div key={icon} onClick={action}>{icon}</div>)
      }
    </div>)
  }
}
