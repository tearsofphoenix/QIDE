import React from 'react'
import PropTypes from 'prop-types'
import File from './File'

const Directory = ({
  directory,
  dblClickHandler,
  clickHandler,
  selectedItem,
  id,
  contextMenuHandler
}) => {
  const arr = directory.subdirectories.map((looper) => <Directory
    key={looper.id}
    id={looper.id}
    directory={looper}
    dblClickHandler= {dblClickHandler}
    clickHandler={clickHandler}
    selectedItem={selectedItem}
    contextMenuHandler={contextMenuHandler}
  />)

  directory.files.forEach(file => {
    arr.push(<File
      key={file.id}
      id={file.id}
      file={file}
      dblClickHandler= {dblClickHandler}
      clickHandler={clickHandler}
      selectedItem={selectedItem}
      contextMenuHandler={contextMenuHandler}
    />)
  })

  const item = (
    <div className="list-item" onClick={clickHandler.bind(null, id, directory.path, directory.type)} onContextMenu={event => contextMenuHandler(event, directory)}>
      <span className="icon icon-file-directory">
        {directory.name}
      </span>
    </div>)
  if (directory.opened) {
    return (
      <li className={selectedItem.id === id ? 'list-nested-item selected' : 'list-nested-item'}>
        {item}
        <ul className="list-tree">
          {arr}
        </ul>
      </li>
    )
  } else {
    return (
      <li className={selectedItem.id === id ? 'list-nested-item collapsed selected' : 'list-nested-item collapsed'} >
        {item}
      </li >
    )
  }
}

Directory.propTypes = {
  directory: PropTypes.object.isRequired,
  dblClickHandler: PropTypes.func.isRequired,
  clickHandler: PropTypes.func.isRequired,
  selectedItem: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  contextMenuHandler: PropTypes.func.isRequired
}

export default Directory
