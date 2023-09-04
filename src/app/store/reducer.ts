import { createReducer, on } from "@ngrx/store";
import { AppState } from './state';
import * as AppActions from './actions';


export const inicialState: AppState = {
  path: '',
  user: {
    idUsuario: 0,
    role: {
      idRol: 0,
      descripcion: ''
    },
    recinto:{
      idRecinto: 0,
      nombre: ''
    },
    nombre: '',
    apellido: '',
    cargo: '',
    correo: '',
    cedula: '',
    telefono: '',
    ext: '',
    celular: '',
    creadoPor: '',
    supervisor: ''
  },
  loading: false,
  token: '',
}

export const appReducer = createReducer(
  inicialState,
  on(AppActions.logIn, (state, { user }) => ({ ...state, user })),
  on(AppActions.Path, (state, { path }) => ({ ...state, path })),
  on(AppActions.Token, (state, { token }) => ({ ...state, token})),
  on(AppActions.Loading, (state, { loading }) => ({ ...state, loading})),

  on(AppActions.App, (state, { app }) => ({ ...state = app})),
)
