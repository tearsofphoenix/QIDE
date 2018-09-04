import React, {PureComponent} from 'react'

type Props = {
  label: ?string,
  options: string[],
  value: ?string,
  onChange: (string) => void,
  style?: {[string]: string | number}
}

export default class Selector extends PureComponent<Props> {
  render() {
    const {label, options, value, onChange, style} = this.props
    return (<div className="control-wrap">
      {label && <div className="label">{label}</div>}
      <div className="controls">
        <select className="input-select" style={style} value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>
    </div>)
  }
}
