
export const FILE_CREATE = 'file/CREATE'

export const FILE_REMOVE = 'file/REMOVE'

export const FILE_RENAME = 'file/RENAME'

/**
 *
 * @return {Action}
 */
export function createFile() {
  return {
    type: FILE_CREATE
  }
}

export function removeFile(file) {
  return {
    type: FILE_REMOVE,
    payload: file
  }
}

export function renameFile(file) {
  return {
    type: FILE_RENAME,
    payload: file
  }
}
