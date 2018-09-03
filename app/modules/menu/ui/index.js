import React from 'react'

import * as CTXMenuItem from './ContextMenuItem'

export ContextMenuItem from './ContextMenuItem'

export ContextMenu from './ContextMenu'

/**
 *
 * @param {[]} settings
 */
export function buildMenu(settings) {
  return settings.map((looper, i) => (<CTXMenuItem key={i} {...looper} />))
}
