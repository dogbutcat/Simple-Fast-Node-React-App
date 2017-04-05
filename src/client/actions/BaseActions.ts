import { Action } from 'redux';
export interface BaseAction<T> extends Action {
    payload: T
}