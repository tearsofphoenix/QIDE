// @flow
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import context, {kAppReducers} from '../modules/context'
import menuModuleLoader from '../modules/menu'
import languageModuleLoader from '../modules/language'

const reducers = {
  router
}

const ctx = {reducers}

menuModuleLoader(ctx)
languageModuleLoader(ctx)

context.set(kAppReducers, ctx)

const rootReducer = combineReducers(reducers)

export default rootReducer
