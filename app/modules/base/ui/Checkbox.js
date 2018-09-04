import React, {PureComponent} from 'react'

type Props = {
  label: ?string,
  checked: boolean,
  onChange: (boolean) => void
}

export default class Checkbox extends PureComponent<Props> {
  handleOnChange = (e) => {
    const {onChange} = this.props
    if(onChange) {
      onChange(e.target.checked)
    }
  }

  render() {
    const {label, checked} = this.props
    return (<div className="control-wrap">
      {label && <div className="label">{label}</div>}
      <div className="controls">
        <input className="input-checkbox" type="checkbox" checked={checked} onChange={this.handleOnChange} />
      </div>
    </div>)
  }
}
