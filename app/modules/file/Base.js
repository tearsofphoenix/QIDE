export default class Base {
  /**
   *
   * @param file
   * @return {ContextMenu}
   */
  buildContextMenu(file) {
    return []
  }

  /**
   *
   * @param position
   */
  showContextMenu(position) {
    const menu = this.buildContextMenu()
    const finalPosition = Base.calculateContextMenuPosition(position, menu)

  }

  /**
   *
   * @param {{x: number, y: number}} position
   * @param contextMenu
   * @return {{x: number, y: number}}
   */
  static calculateContextMenuPosition(position, contextMenu) {
    const result = {}
    const mx = contextMenu.outerWidth()
    const my = contextMenu.outerHeight()
    const ex = position.x
    const ey = position.y

    const body = document.getElementsByTagName('body')[0]
    const maxWidth = body.clientWidth + body.scrollLeft
    const maxHeight = body.clientHeight + body.scrollTop

    if (ex + mx > maxWidth) {
      result.x = ex - mx
    } else {
      result.x = ex
    }

    if (ey + my > maxHeight) {
      result.y = ey - my
    } else {
      result.y = ey
    }

    return result
  }
}
