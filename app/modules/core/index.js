import * as actions from './reducer/actions'
import reducer from './reducer'
import {load} from '../base'
import moduleInfo from './module.json'

export default function(ctx) {
  load({actions, ...moduleInfo}, reducer, ctx)
}
