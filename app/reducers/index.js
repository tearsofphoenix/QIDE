// @flow
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import menuModuleLoader from '../modules/menu'

const reducers = {
  router
}

menuModuleLoader({reducers})

console.log(12, reducers)
const rootReducer = combineReducers(reducers)

export default rootReducer
