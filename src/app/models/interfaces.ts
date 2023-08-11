//interfaces de login necesarias
export interface userAccount {
  usuario: string
  contrasena: string
}

export interface changePassword {
  claveActual: string
  nuevaClave: string
  confirmarNuevaClave: string
}

