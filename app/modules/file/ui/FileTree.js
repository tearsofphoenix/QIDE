import React from 'react'
import PropTypes from 'prop-types'
import Directory from './Directory'

const FileTree = ({
  fileTree,
  dblClickHandler,
  clickHandler,
  selectedItem,
  openCreateMenu,
  openMenuId,
  contextMenuHandler
}) => {
  if (fileTree) {
    return (
      <div className="item-views q-mute">
        <div className="styleguide pane-item">
          <header className="styleguide-header">
            <h5>File Directory</h5>
          </header>
          <main className="styleguide-sections">
            <div className="tree-view-resizer tool-panel">
              <div className="tree-view-scroller">
                <ul className="tree-view full-menu list-tree has-collapsable-children">
                  <Directory
                    directory={fileTree}
                    dblClickHandler={dblClickHandler}
                    id={fileTree.id}
                    clickHandler={clickHandler}
                    selectedItem={selectedItem}
                    openCreateMenu={openCreateMenu}
                    openMenuId={openMenuId}
                    contextMenuHandler={contextMenuHandler}
                  />
                </ul>
              </div>
              <div className="tree-view-resize-handle" />
            </div>
          </main>
        </div>
      </div>
    )
  }
    return (
      <div className="item-views q-mute">
        <div className="styleguide pane-item">
          <header className="styleguide-header">
            <h5>File Directory</h5>
          </header>
          <main className="styleguide-sections">

            <div className="tree-view-resizer tool-panel" />

          </main>
        </div>
      </div>
    )

}

FileTree.propTypes = {
  fileTree: PropTypes.object,
  dblClickHandler: PropTypes.func.isRequired,
  clickHandler: PropTypes.func.isRequired,
  selectedItem: PropTypes.object.isRequired,
  openCreateMenu: PropTypes.func.isRequired,
  openMenuId: PropTypes.number,
  contextMenuHandler: PropTypes.func.isRequired
}

export default FileTree
