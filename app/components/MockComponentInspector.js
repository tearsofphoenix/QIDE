import React, {PureComponent} from 'react';
import SegmentButton from './SegmentButton';
import Selector from './Selector';
import ColorPicker from './ColorPicker';
import Toggle from './Toggle';
import Checkbox from './Checkbox';

export default class MockComponentInspector extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0,
      autoFocusIndex: 0,
      color: '#FF85FF',
      checked: false
    }
  }

  handleSelect = (idx) => this.setState({activeIndex: idx})

  render() {
    const {activeIndex, autoFocusIndex, sample, selectorValue, color, checked} = this.state
    return (
      <div className="item-views">
        <div className="styleguide pane-item">
          <header className="styleguide-header">
            <h5>Component Inspector</h5>
          </header>
          <main className="styleguide-sections">

            <section className="bordered">
              <h3>Props</h3>
              <div className="control">
                <div className="control-rendered">
                  <div className="block">
                    <div className="control-wrap">
                      <div className="label">className</div>
                      <div className="controls">
                        <input className="input-text" type="text" placeholder="todo-item active" />
                      </div>
                    </div>
                  </div>
                  <div className="block">
                    <div className="control-wrap">
                      <div className="label">placeholder</div>
                      <div className="controls">
                        <input
                          className="input-text"
                          type="text"
                          placeholder="What needs to be done?"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="block">
                    <div className="control-wrap">
                      <div className="label">value</div>
                      <div className="controls">
                        <input className="input-text" type="text" placeholder="" />
                      </div>
                    </div>
                  </div>
                  <div className="block">
                    <SegmentButton label="autoFocus"
                                   selected={autoFocusIndex}
                                   titles={['Off', 'On']}
                                   didSelectAt={idx => this.setState({autoFocusIndex: idx})} />
                  </div>
                </div>
              </div>
            </section>
            <section className="bordered">
              <h3>Styles</h3>
              <div className="control">
                <div className="control-rendered">
                  <div className="block">
                    <div className="control-wrap">
                      <div className="label">count</div>
                      <div className="controls"><input className="input-range" type="range" /></div>
                    </div>
                  </div>
                  <div className="block">
                    <div className="control-wrap">
                      <div className="label">columns</div>
                      <div className="controls"><input className="input-range" type="range" /></div>
                    </div>
                  </div>
                  <div className="block">
                    <div className="control-wrap">
                      <div className="label">width</div>
                      <div className="controls"><input className="input-range" type="range" /></div>
                    </div>
                  </div>
                  <div className="block">
                    <div className="control-wrap">
                      <div className="label">padding</div>
                      <div className="controls"><input className="input-number" type="number" min="1" max="10" placeholder="1-10" /></div>
                    </div>
                  </div>
                  <div className="block">
                    <div className="control-wrap">
                      <div className="label">margin</div>
                      <div className="controls"><input className="input-number" type="number" min="1" max="10" placeholder="1-10" /></div>
                    </div>
                  </div>
                  <div className="block">
                    <ColorPicker label="color" value={color} onChange={v => this.setState({color: v})} />
                  </div>
                  <div className="block">
                    <div className="control-wrap">
                      <div className="label">position</div>
                      <div className="controls">
                        <select className="input-select"><option>Relative</option><option>Option 2</option><option>Option 3</option></select>
                      </div>
                    </div>
                  </div>
                  <div className="block">
                    <div className="control-wrap">
                      <div className="label">float</div>
                      <div className="controls"><select className="input-select"><option>Left</option><option>Option 2</option><option>Option 3</option></select></div>
                    </div>
                  </div>
                  <div className="block">
                    <SegmentButton label="active" selected={activeIndex} didSelectAt={this.handleSelect} titles={['Off', 'On']} />
                  </div>
                </div>
              </div>
            </section>

            <section className="bordered">
              {
                // yes, it is quite chilly in here...
              }
              <br /><br /><br /><br /><br /><br /><br /><br /><br />
              <br /><br /><br /><br /><br /><br /><br /><br /><br />
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
                    <div className="control-wrap">
                      <div className="label">Number</div>
                      <div className="controls">
                        <input
                          className="input-number"
                          type="number"
                          min="1" max="10"
                          placeholder="1-10"
                        />
                      </div>
                    </div>
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
