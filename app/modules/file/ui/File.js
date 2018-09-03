import React from 'react'
import PropTypes from 'prop-types'
import {classForFileName} from '../utils'

const File = ({ file, dblClickHandler, selectedItem, id, clickHandler, contextMenuHandler }) => {
  const cls = `icon icon-${classForFileName(file.name)}`
  return (
    <li
      className={selectedItem.id === id ? 'list-item selected' : 'list-item'}
      onDoubleClick={dblClickHandler.bind(null, file)}
      onClick={clickHandler.bind(null, id, file.path, file.type)}
      onContextMenu={(event) => contextMenuHandler(event, file)}
    >
      <span className={cls}>{file.name}</span>
    </li>
  )
}

File.propTypes = {
  file: PropTypes.object.isRequired,
  dblClickHandler: PropTypes.func.isRequired,
  selectedItem: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  clickHandler: PropTypes.func.isRequired,
  contextMenuHandler: PropTypes.func.isRequired
}

export default File
