import React, {Component} from 'react'
import Tree from '../../base/ui/Tree'
import { getElementAt } from '../../base/lib'

const originData = {
  id: '1',
  label: 'app',
  nodes: [
    {
      label: 'header',
      id: '2',
      nodes: [
        {
          label: (<label htmlFor="c4" className="tree_label">
            <span className="treecaret">Sample</span>
            <span className="tree_custom">
                                    type: <span className="text-info">'input'</span><br />
                                    className: <span className="text-info">'new-todo'</span><br />
                                    type: <span className="text-info">'text'</span><br />
                                    placeholder: <span className="text-info">'What needs to be done?'</span><br />
                                    autoFocus: <span className="text-info">true</span><br />
                                    value: <span className="text-info">''</span>
                                  </span>
          </label>)
        }
      ]
    },
    {
      label: 'section',
      id: '3',
      nodes: [
        {
          label: 'input',
          id: '4',
          nodes: [
            {label: 'Level 2'}
          ]
        } ,
        {
          label: 'ul',
          id: '5',
          nodes: [
            {
              label: 'Level 2'
            },
            {
              label: 'Level 2',
            },
            {
              label: 'Level 2',
              nodes: [
                {label: 'Level 3'}
              ]
            }
          ]
        }
      ]
    }
  ]
}

export default class MockComponentTree extends Component {
  constructor(props) {
    super(props)
    this.state = {data: originData}
  }

  toggleCollapse = ({indexPath = []}) => {
    let {data} = this.state
    data = {...data}
    const node = getElementAt(data, indexPath, 'nodes')
    node.collapse = !node.collapse
    this.setState({data})
  }

  render() {
    const {data} = this.state
    return (
      <div className="item-views">
        <div className="styleguide pane-item">
          <header className="styleguide-header">
            <h5>Component Tree</h5>
          </header>

          <main className="styleguide-sections">
            <Tree id="c" isRoot {...data} onClick={this.toggleCollapse} />
          </main>
        </div>
      </div>
    )
  }
}
