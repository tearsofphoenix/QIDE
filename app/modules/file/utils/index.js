type FileCheck = {
  name: string,
  match: (ext: string) => boolean
};

const kFileList: Array<FileCheck> = [
  {
    name: 'file-video',
    match: (ext) => /(avi|mp4)/i.test(ext)
  },
  {
    name: 'file-powerpoint',
    match: (ext) => /(ppt|pptx)/i.test(ext)
  },
  {
    name: 'file-word',
    match: (ext) => /(doc|docx)/i.test(ext)
  },
  {
    name: 'file-pdf',
    match: (ext) => /(pdf)/i.test(ext)
  },
  {
    name: 'file-image',
    match: (ext) => /(jpg|jpeg|png|gif|wep)/i.test(ext)
  },
  {
    name: 'file-excel',
    match: (ext) => /(xlsx|xls)/i.test(ext)
  },
  {
    name: 'file-code',
    match: (ext) => /(js|jsx|json|html|css|lua|qasm|scss|xml|yml)/i.test(ext)
  },
  {
    name: 'file-audio',
    match: (ext) => /(mp3|wav|flac|ape)/i.test(ext)
  },
  {
    name: 'file-archive',
    match: (ext) => /(zip|rar|7z|tar\.gz|tar)/i.test(ext)
  },
  {
    name: 'file-text',
    match: () => true
  }
]

/**
 *
 * @param {string} fileName
 * @return {string}
 */
export function classForFileName(fileName) {
  const parts = fileName.split('.')
  const extName = parts[parts.length - 1]
  console.log(extName)
  const obj = kFileList.find(({match}) => match(extName))
  console.log(obj)
  return obj.name
}
