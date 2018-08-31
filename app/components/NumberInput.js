import React, {PureComponent} from 'react'

type Props = {
  label: ?string,
  value: string | void,
  onChange: void | (string) => void
}

export default class NumberInput extends PureComponent<Props> {
  render() {
    const {label, value, onChange, ...rest} = this.props
    return (<div className="control-wrap">
      {label && <div className="label">{label}</div>}
      <div className="controls">
        <input
          className="input-number"
          type="number"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          {...rest}
        />
      </div>
    </div>)
  }
}
