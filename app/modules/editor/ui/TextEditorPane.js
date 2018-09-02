import React from 'react'
import PropTypes from 'prop-types'
import TextEditor from './TextEditor'
import TabContainer from '../../core/ui/TabContainer'

const TextEditorPane = ({ appState, addEditorInstance, setActiveTab, closeTab }) => {
  const {openTabs} = appState
  const editorArr = openTabs.map(looper => <TextEditor
    key={looper.id}
    id={looper.id}
    tab={looper}
    activeTab={appState.activeTab}
    addEditorInstance={addEditorInstance}
  />)
  return (
    <ride-pane>
      <TabContainer appState={appState} setActiveTab={setActiveTab} closeTab={closeTab} />
      {editorArr}
    </ride-pane>
  )
}

TextEditorPane.propTypes = {
  appState: PropTypes.object.isRequired,
  addEditorInstance: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  closeTab: PropTypes.func.isRequired
}

export default TextEditorPane
