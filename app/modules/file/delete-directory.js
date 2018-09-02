

const fs = require('fs')
const path = require('path')

module.exports = (filePath) => {
  try {
    fs.accessSync(filePath)
    recursivelyDelete(filePath)
  } catch (e) {
    
  }
  
  function recursivelyDelete(filePath) {
    // check if directory or file
    const stats = fs.statSync(filePath)
    // if file unlinkSync
    if (stats.isFile()) {
      fs.unlinkSync(filePath)
    }
    // if directory, readdir and call recursivelyDelete for each file
    else {
      const files = fs.readdirSync(filePath)
      files.forEach((file) => {
        recursivelyDelete(path.join(filePath, file))
      })
      fs.rmdirSync(filePath)
    }
  }
}