import React from 'react';
import PropTypes from 'prop-types';
import Tab from '../../base/ui/Tab';

const TabContainer = ({
  appState,
  setActiveTab,
  closeTab
}) => {
  const tabs = appState.openTabs.map((looper) => <Tab
    key={looper.id}
    name={looper.name}
    setActiveTab={setActiveTab}
    id={looper.id}
    closeTab={closeTab}
    active={appState.activeTab === looper.id}
  />)
    return (
      <ul className="list-inline tab-bar inset-panel tab-container">
        {tabs}
      </ul>
    )
}

TabContainer.propTypes = {
  appState: PropTypes.object.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  closeTab: PropTypes.func.isRequired
}

export default TabContainer;
