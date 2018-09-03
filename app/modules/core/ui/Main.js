import React from 'react'
import {connect} from 'react-redux'
import FileTree from '../../file/ui/FileTree'
import TextEditorPane from '../../editor/ui/TextEditorPane'
import MockComponentTree from './MockComponentTree'
import MockComponentInspector from './MockComponentInspector'

import {ContextMenu, ContextMenuItem} from '../../menu/ui/index'
import {showContextMenu, hideContextMenu} from '../../menu/reducer/actions'
import type {Position} from '../../base/types/position'
import type {MenuStateType} from '../../menu/reducer/index'

const { ipcRenderer } = require('electron')
const fs = require('fs')
const path = require('path')
const { getTree } = require('../../file/file-tree')
const { File, Directory } = require('../../file/item-schema')

type Props = {
  menu?: MenuStateType,
  showContextMenu?: (position: Position) => void,
  hideContextMenu?: () => void
}

/**
 * @class App
 */
class Main extends React.Component<Props> {
  constructor() {
    super()
    this.state = {
      nextTabId: 0,
      openTabs: [],
      activeTab: null,
      openedProjectPath: '',
      openMenuId: null,
      createMenuInfo: {
        id: null,
        type: null
      },
      fileTree: null,
      watch: null,
      rootDirPath: '',
      selectedItem: {
        id: null,
        path: '',
        type: null,
        focused: false
      },
      renameFlag: false,
      fileChangeType: null,
      deletePromptOpen: false,
      newName: ''
    }

    this.fileTreeInit()

    // reset tabs, should store state in local storage before doing this though
    ipcRenderer.on('openDir', (event, projPath) => {
      const {openedProjectPath} = this.state
      if (openedProjectPath !== projPath) {
        this.setState({ openTabs: [], activeTab: null, openedProjectPath: projPath, nextTabId: 0 })
      }
    })
    ipcRenderer.on('saveFile', () => {
      const {activeTab} = this.state
      if (activeTab !== null) {
        this.saveTab()
      }
    })
    ipcRenderer.on('delete', () => {
      const {selectedItem: {id}} = this.state
      if (id) {
        this.setState({
          deletePromptOpen: true,
          fileChangeType: 'delete'
        })
      }
    })
    ipcRenderer.on('enter', () => {
      const {selectedItem: {focused}} = this.state
      if (focused) {
        // rename property just true or false i guess
        this.setState({
          renameFlag: true
        })
      }
    })
  }

  // registers listeners for opening projects and new projects
  fileTreeInit = () => {
    ipcRenderer.on('openDir', (event, dirPath) => {
      const {rootDirPath} = this.state
      if (dirPath !== rootDirPath) {
        this.setFileTree(dirPath)
      }
    })
    ipcRenderer.on('newProject', () => {
      const {watch} = this.state
      if (watch) watch.close()
      this.setState({
        fileTree: null,
        watch: null,
        rootDirPath: '',
        selectedItem: {
          id: null,
          path: null,
          type: null
        }
      })
    })
  }

  // sends old path and new name to main process to rename, closes rename form and sets filechangetype and newName for fswatch
  renameHandler = (event) => {
    if (event.key === 'Enter' && event.target.value) {
      const {selectedItem} = this.state
      ipcRenderer.send('rename', selectedItem.path, event.target.value)
      this.setState({
        renameFlag: false,
        fileChangeType: 'rename',
        newName: event.target.value
      })
    } else if (event.key === 'Enter' && !event.target.value) {
      this.setState({
        renameFlag: false
      })
    }
  }

  // handles click event from delete prompt
  deletePromptHandler = (answer) => {
    if (answer) {
      const {selectedItem} = this.state
      ipcRenderer.send('delete', selectedItem.path)
    } else {
      this.setState({
        fileChangeType: null
      })
    }

    this.setState({
      deletePromptOpen: false
    })
  }

  // handles click events for directories and files in file tree render
  clickHandler = (id, filePath, type, event) => {
    const temp = this.state.fileTree
    const {openMenuId} = this.state
    document.body.onkeydown = event => {
      if (event.key === 'Enter') {
        this.setState({
          renameFlag: true
        })
        document.body.onkeydown = () => {}
      }
    }
    if (type === 'directory') {
      const toggleClicked = (dir) => {
        if (dir.path === filePath) {
          dir.opened = !dir.opened
        } else {
          dir.subdirectories.forEach(looper => toggleClicked(looper))
        }
      }

      toggleClicked(temp)
    }
    // so opened menu doesn't immediately close
    if (openMenuId === null) event.stopPropagation()

    this.setState({
      selectedItem: {
        id,
        path: filePath,
        type,
        focused: true
      },
      fileTree: temp,
      renameFlag: false,
      createMenuInfo: {
        id: null,
        type: null
      }
    })
  }

  // calls file tree module and sets state with file tree object representation in callback
  setFileTree = (dirPath) => {
    getTree(dirPath, ft => {
      // if watcher instance already exists close it as it's for the previously opened project
      let {watch} = this.state
      if (watch) {
        watch.close()
      }

      watch = fs.watch(dirPath, { recursive: true }, (eventType, fileName) => {
        if (eventType === 'rename') {
          const {openTabs, fileTree, rootDirPath} = this.state
          const absPath = path.join(rootDirPath, fileName)
          const parentDir = this.findParentDir(path.dirname(absPath), fileTree)
          const name = path.basename(absPath)
          // delete handler
          if (this.state.fileChangeType === 'delete') {
            let index
            if (this.state.selectedItem.type === 'directory') {
              index = this.findItemIndex(parentDir.subdirectories, name)
              parentDir.subdirectories.splice(index, 1)
            } else {
              index = this.findItemIndex(parentDir.files, name)
              parentDir.files.splice(index, 1)
            }
            const idx = this.state.openTabs.findIndex(looper => looper.name === name)
            openTabs.splice(idx, 1)
          } else if (this.state.fileChangeType === 'new') {
            // new handler
            if (this.state.createMenuInfo.type === 'directory') {
              parentDir.subdirectories.push(new Directory(absPath, name))
            } else {
              parentDir.files.push(new File(absPath, name))
            }
          } else if (this.state.fileChangeType === 'rename' && this.state.newName) {
            // rename handler
            // fileName has new name, selectedItem has old name and path
            let index
            if (this.state.selectedItem.type === 'directory') {
              index = this.findItemIndex(parentDir.subdirectories, name)
              parentDir.subdirectories[index].name = this.state.newName
              parentDir.subdirectories[index].path = path.join(path.dirname(absPath), this.state.newName)
            } else {
              index = this.findItemIndex(parentDir.files, name)
              parentDir.files[index].name = this.state.newName
              parentDir.files[index].path = path.join(path.dirname(absPath), this.state.newName)
            }

            // renames path of selected renamed file so it has the right info
            this.setState({
              selectedItem: {
                id: this.state.selectedItem.id,
                type: this.state.selectedItem.type,
                path: path.join(path.dirname(absPath), this.state.newName)
              }
            })

            // rename the opened tab of the renamed file if it's there
            const idx = openTabs.findIndex(looper => looper.name === name)
            openTabs[idx].name = this.state.newName
          }

          this.setState({
            fileTree,
            fileChangeType: null,
            newName: '',
            createMenuInfo: {
              id: null,
              type: null
            },
            openTabs
          })
        }
      })

      this.setState({
        fileTree: ft,
        rootDirPath: dirPath,
        watch
      })
    })
  }

  // returns index of file/dir in files or subdirectories array
  findItemIndex = (filesOrDirs, name) => filesOrDirs.findIndex(looper => looper.name === name)

  // returns parent directory object of file/directory in question
  findParentDir = (dirPath, directory) => {
    const {fileTree} = this.state
    if (!directory) {
      directory = fileTree
    }
    if (directory.path === dirPath) return directory

    let dirNode
    for (const i in directory.subdirectories) {
      dirNode = this.findParentDir(dirPath, directory.subdirectories[i])
      if (dirNode) return dirNode
    }

  }

  // click handler for plus button on directories, 'opens' new file/dir menu by setting openMenuID state
  openCreateMenu = (id, itemPath, type, event) => {
    console.log(id, itemPath, type, event)
    event && event.stopPropagation()
    this.setState({
      openMenuId: id,
      selectedItem: {
        id,
        path: itemPath,
        type
      }
    })
  }

  // handler for create menu
  createMenuHandler = (id, type, event) => {
    // unhook keypress listeners
    document.body.onkeydown = () => {}

    event.stopPropagation()

    this.setState({
      createMenuInfo: {
        id,
        type
      },
      openMenuId: null
    })
  }

  // sends input name to main, where the file/directory is actually created.
  // creation of new file/directory will trigger watch handler
  createItem = (event) => {
    if (event.key === 'Enter') {
      const {selectedItem, createMenuInfo} = this.state
      // send path and file type to main process to actually create file/dir only if there is value
      if (event.target.value)
        ipcRenderer.send(
          'createItem',
          selectedItem.path,
          event.target.value,
          createMenuInfo.type
        )

      // set type of file change so watch handler knows which type
      this.setState({
        fileChangeType: 'new'
      })
    }
  }

  // tab close handler
  closeTab = (id, event) => {
    const {openTabs} = this.state
    const temp = openTabs.slice(0)
    const idx = temp.findIndex(looper => looper.id === id)
    temp.splice(idx, 1)
    event.stopPropagation()
    this.setState({ openTabs: temp, activeTab: temp[0] ? temp[0].id : null })
  }

  addEditorInstance = (editor, id) => {
    const {openTabs} = this.state
    const target = openTabs.find(looper => looper.id === id)
    target.editor = editor
    console.log(editor, id, target)
    this.setState({ openTabs: openTabs.slice(0)})
  }

  // save handler
  saveTab = () => {
    const {openTabs, activeTab} = this.state
    const idx = openTabs.findIndex((looper) => looper.id === activeTab)
    const target = openTabs[idx]
    console.log(362, target, idx, activeTab, target.editor.getValue())
    fs.writeFileSync(target.path, target.editor.getValue(), { encoding: 'utf8' })
  }

  // sets active tab
  setActiveTab = (id) => {
    this.setState({ activeTab: id })
  }

  // double click handler for files
  dblClickHandler = (file) => {
    let id = this.isFileOpened(file)
    if (id === -1) {
      const {openTabs, nextTabId} = this.state
      id = nextTabId
      openTabs.push({
        path: file.path,
        id,
        name: file.name,
        modified: false,
        editor: null
      })
      this.setState({ openTabs, activeTab: id, nextTabId: id + 1 })
      // store.dispatch()
    } else {
      this.setState({ activeTab: id })
    }
  }

  // checks if project is already open
  isFileOpened = (file) => {
    const {openTabs} = this.state
    return openTabs.findIndex(looper => looper.path === file.path)
  }

  contextMenuHandler = (event, file) => {
    event.preventDefault()
    event.stopPropagation()
    console.log(event.pageX, event.pageY, file)
    const position = {x: event.pageX, y: event.pageY}
    this.props.showContextMenu(position)
  }

  // closes any open dialogs, handles clicks on anywhere besides the active open menu/form
  closeOpenDialogs = () => {
    const {selectedItem} = this.state
    selectedItem.focused = false

    document.body.onkeydown = () => {}
    this.props.hideContextMenu()

    this.setState({
      openMenuId: null,
      createMenuInfo: {
        id: null,
        type: null
      },
      selectedItem,
      renameFlag: false
    })
  }

  render() {
    const {openMenuId, createMenuInfo, fileTree, selectedItem} = this.state
    const {menu = {}} = this.props
    console.log(431, menu)
    const {show, position} = menu
    console.log(position)
    return (
      <ride-workspace className="scrollbars-visible-always" onClick={this.closeOpenDialogs}>

        <ride-panel-container className="header" />

        <ride-pane-container>
          <ride-pane-axis className="horizontal">

            <ride-pane style={{ flexGrow: 0, flexBasis: '300px' }}>
              <FileTree
                dblClickHandler={this.dblClickHandler}
                openCreateMenu={this.openCreateMenu}
                openMenuId={openMenuId}
                createMenuInfo={createMenuInfo}
                createMenuHandler={this.createMenuHandler}
                createItem={this.createItem}
                fileTree={fileTree}
                selectedItem={selectedItem}
                clickHandler={this.clickHandler}
                contextMenuHandler={this.contextMenuHandler}
              />

              <MockComponentTree />

            </ride-pane>
            <ride-pane-resize-handle class="horizontal" />

            <TextEditorPane
              appState={this.state}
              setActiveTab={this.setActiveTab}
              addEditorInstance={this.addEditorInstance}
              closeTab={this.closeTab}
              openMenuId={openMenuId}
            />

            <ride-pane-resize-handle className="horizontal" />

            <ride-pane style={{ flexGrow: 0, flexBasis: '300px' }}>

              <MockComponentInspector />

            </ride-pane>

          </ride-pane-axis>
        </ride-pane-container>

        {show && <ContextMenu position={position}>
          <ContextMenuItem name="New File" shortcut="Ctrl+N" />
          <ContextMenuItem name="New Folder" shortcut="Ctrl+N" />
          <ContextMenuItem splitter />
          <ContextMenuItem name="New Folder" shortcut="Ctrl+N" />
        </ContextMenu>}

      </ride-workspace>
    )
  }
}

export default connect(({menu}) => ({menu}), {showContextMenu, hideContextMenu})(Main)
