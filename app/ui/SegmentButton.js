import React, {PureComponent} from 'react'
import cx from 'classnames'

type Props = {
  label: ?string,
  titles: string[],
  selected: ?number,
  didSelectAt: (number) => void
}

export default class SegmentButton extends PureComponent<Props> {
  render() {
    const {label, titles, selected, didSelectAt} = this.props
    return (<div className="control-wrap">
      {label && <div className="label">{label}</div>}
      <div className="controls">
        <div className="btn-group">
          {titles.map((t, i) => {
            const cls = cx('btn', selected === i ? 'selected' : '')
            return <button type="button" className={cls} key={t} onClick={() => didSelectAt(i)}>{t}</button>
          })}
        </div>
      </div>
    </div>)
  }
}
