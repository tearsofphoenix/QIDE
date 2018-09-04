import React, {PureComponent} from 'react'

type Props = {
  icon?: string,
  label?: any,
  selected?: boolean,
  onClick?: () => void,
  style?: {[string]: string | number}
}

export default class IconButton extends PureComponent<Props> {
  props: Props

  render() {
    const {icon, label, selected, onClick, style, ...rest} = this.props
    const cls = `fa fa-${icon} q-cursor-default`
    let content = label
    if (typeof label === 'string') {
      content = (<span style={{marginLeft: '.4em', fontWeight: 'normal'}}>{label}</span>)
    }
    const finalStyle = Object.assign({
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '.4em',
      paddingRight: '.4em'
    }, style)
    if (selected) {
      finalStyle.color = 'white'
      finalStyle.background = '#2d2f30'
    } else {
      finalStyle.color = '#bbb'
      finalStyle.background = '#23272f'
    }
    return <div className={cls} onClick={onClick} style={finalStyle} {...rest}>{content}</div>
  }
}
