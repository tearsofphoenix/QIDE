import React, {PureComponent} from 'react';
import SegmentButton from '../ui/SegmentButton';
import Selector from '../ui/Selector';
import ColorPicker from '../ui/ColorPicker';
import Toggle from '../ui/Toggle';
import Checkbox from '../ui/Checkbox';
import NumberInput from '../ui/NumberInput';

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
              <div className="control">
                <div className="control-rendered">
                  <div className="block">
                    <SegmentButton label="Sample" selected={sample} didSelectAt={v => this.setState({sample: v})} titles={['One', 'Two', 'Three']}/>
                  </div>
                </div>
              </div>
              <h3>Selectors</h3>
              <div className="control">
                <div className="control-rendered">
                  <div className="block">
                    <div className="control-wrap">
                      <div className="label">Range</div>
                      <div className="controls"><input className="input-range" type="range" /></div>
                    </div>
                  </div>
                  <div className="block">
                    <NumberInput label="Number" min={1} max={10} />
                  </div>
                  <div className="block">
                    <ColorPicker label="color" value={color} onChange={v => this.setState({color: v})} />
                  </div>
                  <div className="block">
                    <Selector label="Selector"
                              options={['1', '2', '3']}
                              value={selectorValue}
                              onChange={(v) => this.setState({selectorValue: v})} />
                  </div>
                </div>
              </div>
              <h3>Booleans</h3>
              <div className="control">
                <div className="control-rendered">
                  <div className="block">
                    <Checkbox label="checkbox" checked={checked} onChange={v => this.setState({checked: v})} />
                  </div>
                  <div className="block">
                    <Toggle label="Toggle" checked={checked} onChange={v => this.setState({checked: v})} />
                  </div>
                </div>
              </div>
              <h3>Inputs Alternate</h3>
              <div className="control">
                <div className="control-rendered">
                  <div className="block">
                    <div className="control-wrap">
                      <div className="label">Text Input</div>
                      <div className="controls">
                        <input className="input-text" type="text" placeholder="Text" />
                      </div>
                    </div>
                  </div>
                  <div className="block">
                    <div className="control-wrap">
                      <div className="label">Search Input</div>
                      <div className="controls">
                        <input className="input-search" type="search" placeholder="Search" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h3>Wide Inputs</h3>
              <div className="control">
                <div className="control-rendered">
                  <input className="input-text" type="text" placeholder="Text" />
                  <input className="input-search" type="search" placeholder="Search" />
                  <textarea className="input-textarea" placeholder="Text Area"></textarea>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    )
  }
}
