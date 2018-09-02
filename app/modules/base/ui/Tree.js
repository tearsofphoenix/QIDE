// @flow
import * as React from 'react'
import type {IndexPath} from '../types/base'

const {Component, Node} = React

type Props = {
  id: string,
  label?: Node,
  nodes?: string[],
  isRoot: boolean,
  indexPath: ?IndexPath,
  collapse?: boolean,
  onClick?: (info: Props) => void
};

export default class Tree extends Component<Props> {
  handleOnClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const {onClick} = this.props
    if (onClick) {
      onClick(this.props)
    }
  }

  render() {
    const {id, label, nodes = [], collapse, isRoot, indexPath = []} = this.props
    let children
    let checked = false
    let labelElement
    const superID = id
    if (nodes.length > 0 && !collapse) {
      children = (<ul>
        {
          nodes.map((looper, i) => {
            const {id = '', ...rest} = looper
            const subid = `${superID}-${id}-${i}`
            const idxPath = [...indexPath, i]
            return <Tree id={subid} key={subid} {...rest} indexPath={idxPath} />
          })
        }
      </ul>)
      checked = true
    }
    if (typeof label === 'string') {
      labelElement = (<label htmlFor={id} className="tree_label" onClick={this.handleOnClick} >{label}</label>)
    } else if (typeof label === 'function') {
      labelElement = label()
    } else {
      labelElement = label
    }

    const disabled = nodes.length === 0

    const content = (<li>
        <input type="checkbox" checked={checked} disabled={disabled} id={id} />
        {labelElement}
        {children}
      </li>)

    let result
    if (isRoot) {
      result = (<div className="tree-view-resizer tool-panel q-mute">
        <div className="tree-view-scroller">
          <ul className="tree">
            {content}
          </ul>
        </div>
      </div>)
    } else {
      result = content
    }
    return result
  }
}
