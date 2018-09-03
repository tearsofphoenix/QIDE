import React, {PureComponent} from 'react'

type Props = {
  label: ?string
}

export default class TextInput extends PureComponent<Props> {
  render() {
    const {label, ...rest} = this.props
    return (<div className="control-wrap">
      {label && <div className="label">{label}</div>}
      <div className="controls">
        <input className="input-text" {...rest} />
      </div>
    </div>)
  }
}
