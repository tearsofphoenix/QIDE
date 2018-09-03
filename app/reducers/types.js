import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux'
import type {Action} from '../modules/base/types/base'

export type counterStateType = {
  +counter: number
};


export type GetState = () => counterStateType;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
