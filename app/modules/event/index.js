import {get} from '../base'
import context from '../context'
import {kAppStore} from '../context/constants'

export function register() {

}

/**
 *
 * @param args
 */
export function send(...args) {
  const [id, action, ...rest] = args
  const module = get(id)
  if (module) {
    const {actions} = module
    const act = actions[action]
    if (typeof act === 'function') {
      const store = context.get(kAppStore)
      store.dispatch(act(...rest))
    } else {
      console.warn(`[module] action not found ${id} ${action}`)
    }
  } else {
    console.warn(`[module] not found ${id}`)
  }
}
