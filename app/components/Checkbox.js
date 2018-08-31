import React, {PureComponent} from 'react'

type Props = {
  label: string,
  checked: boolean,
  onChange: (boolean) => void
}

export default class Checkbox extends PureComponent<Props> {
  render() {
    const {label, checked, onChange} = this.props
    return (<div className="control-wrap">
      {label && <div className="label">{label}</div>}
      <div className="controls">
        <input className="input-checkbox" type="checkbox" checked={checked} onChange={e => onChange && onChange(e.target.checked)} />
      </div>
    </div>)
  }
}
