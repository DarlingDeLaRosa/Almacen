
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
  usuario1: string
  creadoPor: string
}

export interface AppState {
  path: string
  user:  User;
  edit: any,
  token: string
}

export interface GETUser {
  data: any
  message: string
  success: boolean
  token: string
}
