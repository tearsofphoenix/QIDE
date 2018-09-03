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
  dirtyTreeID?: string,
  onClick?: (info: Props) => void
};

export default class Tree extends Component<Props> {
  constructor(props) {
    super(props)
    const {collapse, nodes = []} = props
    let c = collapse
    if (typeof c === 'undefined') {
      c = nodes.length < 0
    }
    this.state = {collapse: c}
  }

  componentWillReceiveProps(nextProps) {
    const {collapse, dirtyTreeID, id} = nextProps
    console.log(32, dirtyTreeID, collapse, id)
    if (dirtyTreeID === id) {
      this.setState({collapse, dirtyTreeID, timestamp: Date.now()})
    } else {
      this.setState({ collapse, dirtyTreeID })
    }
  }

  handleOnClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const {onClick} = this.props
    if (onClick) {
      onClick(this.props)
    }
  }

  render() {
    const {id, label, nodes = [], isRoot, indexPath = [], onClick} = this.props
    const {collapse, dirtyTreeID} = this.state
    let children
    let checked = false
    let labelElement
    if (nodes.length > 0 && !collapse) {
      const superID = id
      children = (<ul>
        {
          nodes.map((looper, i) => {
            const {id = '', ...rest} = looper
            const subid = `${superID}-${id}-${i}`
            const idxPath = [...indexPath, i]
            return <Tree id={subid} key={subid} {...rest} indexPath={idxPath} onClick={onClick} dirtyTreeID={dirtyTreeID} />
          })
        }
      </ul>)

      console.log(55, id, nodes.length, collapse, children)
      checked = true
    }
    if (typeof label === 'string') {
      labelElement = (<label htmlFor={id} className="tree_label">{label}</label>)
    } else if (typeof label === 'function') {
      labelElement = label()
    } else {
      labelElement = label
    }

    const disabled = nodes.length === 0
    const content = (<li>
        <input type="checkbox" checked={checked} disabled={disabled} id={id} onChange={this.handleOnClick} />
        {labelElement}
        {children}
      </li>)

    let result
    if (isRoot) {
      result = (<div className="tree-view-resizer tool-panel q-mute">
        <div className="tree-view-scroller">
          {dirtyTreeID && <span />}
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
