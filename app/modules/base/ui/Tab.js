import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

const Tab = ({ name, setActiveTab, id, closeTab, active }) => (
    <li className={cx('texteditor tab', {'q-tab-active': active})} onClick={setActiveTab.bind(null, id)}>
      <div className="title">{name}</div>
      <div className="close-icon" onClick={closeTab.bind(null, id)} />
    </li>
  )

Tab.propTypes = {
  name: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  closeTab: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired
}

export default Tab
