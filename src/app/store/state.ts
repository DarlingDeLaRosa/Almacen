
export interface User {
  idUsuario: number
  role:{
    idRol: number
    descripcion: string
  }
  recinto: {
    idRecinto: number
    nombre: string
  }
  nombre: string
  apellido: string
  cargo: string
  correo: string
  cedula: string
  telefono: string
  ext: string
  celular: string
  creadoPor: any
  supervisor: any
}

export interface AppState {
  path: string
  user:  User;
  loading: boolean,
  token: string
}

export interface GETUser {
  data: any
  message: string
  success: boolean
  token: string
}
