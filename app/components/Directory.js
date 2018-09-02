import React from 'react'
import PropTypes from 'prop-types'
import File from './File'
import CreateMenu from './CreateMenu'
import CreateForm from './CreateForm'
import RenameForm from './RenameForm'

const Directory = ({
  directory,
  dblClickHandler,
  clickHandler,
  selectedItem,
  openCreateMenu,
  openMenuId,
  createMenuInfo,
  createMenuHandler,
  createItem,
  renameFlag,
  renameHandler,
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
    openCreateMenu={openCreateMenu}
    openMenuId={openMenuId}
    createMenuInfo={createMenuInfo}
    createMenuHandler={createMenuHandler}
    createItem={createItem}
    renameFlag={renameFlag}
    renameHandler={renameHandler}
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
      renameFlag={renameFlag}
      renameHandler={renameHandler}
      contextMenuHandler={contextMenuHandler}
    />)
  })

  const item = (
    <div className="list-item" onClick={clickHandler.bind(null, id, directory.path, directory.type)} onContextMenu={event => contextMenuHandler(event, directory)}>
      <span className="icon icon-file-directory">
        {directory.name}
      </span>
      <span className="plus-icon" onClick={() => openCreateMenu(id, directory.path)}>+</span>
      {openMenuId === id ? <CreateMenu createMenuHandler={createMenuHandler} id={id} /> : <span />}
      {createMenuInfo.id === id ? <CreateForm createItem={createItem} /> : <span />}
    </div>)
  if (directory.opened) {
    return (
      <li className={selectedItem.id === id ? 'list-nested-item selected' : 'list-nested-item'}>
        {renameFlag && selectedItem.id === id ? <RenameForm renameHandler={renameHandler} /> : item}
        <ul className="list-tree">
          {arr}
        </ul>
      </li>
    )
  } else {
    return (
      <li className={selectedItem.id === id ? 'list-nested-item collapsed selected' : 'list-nested-item collapsed'} >
        {renameFlag && selectedItem.id === id ? <RenameForm renameHandler={renameHandler} /> : item}
      </li >
    )
  }
}

Directory.propTypes = {
  directory: PropTypes.object.isRequired,
  dblClickHandler: PropTypes.func.isRequired,
  clickHandler: PropTypes.func.isRequired,
  selectedItem: PropTypes.object.isRequired,
  openCreateMenu: PropTypes.func.isRequired,
  openMenuId: PropTypes.number,
  createMenuInfo: PropTypes.object.isRequired,
  createMenuHandler: PropTypes.func.isRequired,
  createItem: PropTypes.func.isRequired,
  renameFlag: PropTypes.bool.isRequired,
  renameHandler: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  contextMenuHandler: PropTypes.func.isRequired
}

export default Directory
