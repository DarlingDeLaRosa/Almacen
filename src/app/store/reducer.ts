import { createReducer, on } from "@ngrx/store";
import { AppState } from './state';
import * as AppActions from './actions';


export const inicialState: AppState = {
  path: '',
  user: {
    idUsuario: '',
    idRol: 0,
    idRecinto: 0,
    nombre: '',
    apellido: '',
    cargo: '',
    correo: '',
    cedula: '',
    telefono: '',
    ext: '',
    celular: '',
    usuario1: ''
  },
  edit: '',
  token: ''
}

export const appReducer = createReducer(
  inicialState,
  on(AppActions.logIn, (state, { user }) => ({ ...state, user })),
  on(AppActions.Path, (state, { path }) => ({ ...state, path })),
  on(AppActions.Token, (state, { token }) => ({ ...state, token})),

)
