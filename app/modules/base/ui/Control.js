import React, {PureComponent} from 'react'

type Props = {
  children: any,
  plain?: boolean
}

export default class Control extends PureComponent<Props> {
  render() {
    const {children = [], plain = false} = this.props
    let array = children
    if (!Array.isArray(array)) {
      array = [array]
    }
    let result = array
    if (!plain) {
      result = array.map((item, i) => (<div className="block" key={i}>{item}</div>))
    }
    return (<div className="control">
      <div className="control-rendered">
        {result}
      </div>
    </div>)
  }
}
