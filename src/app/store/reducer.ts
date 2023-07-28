import { createReducer, on } from "@ngrx/store";
import { AppState } from './state';
import * as AppActions from './actions';


export const inicialState: AppState ={
  path: '',
  user: {
    rol: '',
    name: ''
  },
  edit: ''
}

export const appReducer = createReducer(
  inicialState,
  on(AppActions.logIn, (state, {user}) => ({...state, user})),
  on(AppActions.Path, (state, {path}) => ({...state, path})),

)
