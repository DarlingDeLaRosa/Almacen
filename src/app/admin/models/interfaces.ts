export interface tipoSalida {
  id: number
  nombre: string
  descripcion: string
}

export interface getTipoSalida {
  creadoPor: number
  descripcion: string
  fechaCreacion: string
  fechaModif: string
  idTipoSalida: number
  nombre: string
}

export interface postTipoSalida {
  nombre: string
  descripcion: string
}

export interface removeTipoSalida {
  id: number
}

export interface tipoProducto {
  id: number
  nombre: string
}


/*RESPUESTA GET*/
export interface GET {
  data: any
  message: string
  success: boolean
}
