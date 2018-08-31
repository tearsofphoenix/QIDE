import React, {PureComponent} from 'react'

type Props = {
  label: string,
  options: string[],
  value: string,
  onChange: (string) => void
}

export default class Selector extends PureComponent<Props> {
  render() {
    const {label, options, value, onChange} = this.props
    return (<div className="control-wrap">
      {label && <div className="label">{label}</div>}
      <div className="controls">
        <select className="input-select" value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>
    </div>)
  }
}
