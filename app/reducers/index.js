// @flow
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './counter'
import menuModuleLoader from '../modules/menu'

const reducers = {
  counter,
  router
}

menuModuleLoader({reducers})

console.log(14, reducers)

const rootReducer = combineReducers(reducers)

export default rootReducer
