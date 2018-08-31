import React from 'react';
import PropTypes from 'prop-types';
import TextEditor from './TextEditor';
import TabContainer from './TabContainer';

const TextEditorPane = ({ appState, addEditorInstance, setActiveTab, closeTab }) => {
  const editorArr = [];
  for (let i = 0; i < appState.openTabs.length; i++) {
    editorArr.push(
      <TextEditor
        key={appState.openTabs[i].id}
        id={appState.openTabs[i].id}
        tab={appState.openTabs[i]}
        activeTab={appState.activeTab}
        addEditorInstance={addEditorInstance}
      />
    );
  }
  return (
    <ride-pane>
      <TabContainer appState={appState} setActiveTab={setActiveTab} closeTab={closeTab} />
      {editorArr}
      <TextEditor />
    </ride-pane>
  );
};

TextEditorPane.propTypes = {
  appState: PropTypes.object.isRequired,
  addEditorInstance: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  closeTab: PropTypes.func.isRequired
};

export default TextEditorPane;
