import React, {PureComponent} from 'react'
import {
  Control, Range,
  SegmentButton, Selector, ColorPicker, Toggle,
  Checkbox, NumberInput, TextInput
} from '../../base/ui'

export default class MockComponentInspector extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      color: '#FF85FF',
      checked: false
    }
  }

  render() {
    const {sample, selectorValue, color, checked} = this.state
    return (
      <div className="item-views">
        <div className="styleguide pane-item">
          <header className="styleguide-header">
            <h5>Component Inspector</h5>
          </header>
          <main className="styleguide-sections">

            <section className="bordered">
              <h1 className="section-heading">Controls Library</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
              <h3>Button Groups &amp; Selectors</h3>
              <Control>
                <SegmentButton label="Sample" selected={sample} didSelectAt={v => this.setState({sample: v})} titles={['One', 'Two', 'Three']}/>
              </Control>
              <h3>Selectors</h3>
              <Control>
                <Range label="Range" />
                <NumberInput label="Number" min={1} max={10} />
                <ColorPicker label="Color" value={color} onChange={v => this.setState({color: v})} />
                <Selector label="Selector"
                          options={['1', '2', '3']}
                          value={selectorValue}
                          onChange={(v) => this.setState({selectorValue: v})} />
              </Control>
              <h3>Booleans</h3>
              <Control>
                <Checkbox label="checkbox" checked={checked} onChange={v => this.setState({checked: v})} />
                <Toggle label="Toggle" checked={checked} onChange={v => this.setState({checked: v})} />
              </Control>
              <h3>Inputs Alternate</h3>
              <Control>
                <TextInput label="Text Input" type="text" placeholder="Text" />
                <TextInput label="Search Input" type="text" placeholder="Text" />
              </Control>
              <h3>Wide Inputs</h3>
              <Control>
                <input className="input-text" type="text" placeholder="Text" />
                <input className="input-search" type="search" placeholder="Search" />
                <textarea className="input-textarea" placeholder="Text Area" />
              </Control>
            </section>
          </main>
        </div>
      </div>
    )
  }
}
