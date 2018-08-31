import React, {PureComponent} from 'react'

type Props = {
  label: ?string,
  value: string,
  onChange: (string) => void
}

export default class ColorPicker extends PureComponent<Props> {
  render() {
    const {label, value, onChange} = this.props
    return (<div className="control-wrap">
      {label && <div className="label">{label}</div>}
      <div className="controls">
        <input className="input-color" type="color" value={value} onChange={e => onChange && onChange(e.target.value)} />
      </div>
    </div>)
  }
}
