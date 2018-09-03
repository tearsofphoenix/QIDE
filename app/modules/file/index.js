import reducer from './reducer'
import {load} from '../base'
import moduleInfo from './module.json'

export default function(ctx) {
  load(moduleInfo, reducer, ctx)
}
