
export interface detalleProductoEntrada {
  itbisEspecifico: boolean,
  producto: string,
  cantidad: number,
  condicion: string,
  marca: string,
  modelo: string,
  precio: number,
  noSerial: string,
  ITBISArticulo: number,
  subtotal: number,
}



/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

export interface detalleProductoSalida {
  existencia: number,
  idProducto: string,
  cantidad: number,
  condicion: string,
  marca: string,
  modelo: string,
  precio: number,
  noSerial: string,
}



/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

export interface tipoSalida {
  idTipoSalida: number
  nombre: string
  descripcion: string
}

export interface postTipoSalida {
  nombre: string
  descripcion: string
}

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

export interface tipoProducto {
  idTipoArt: number
  nombre: string
}

export interface postTipoProducto {
  nombre: string
}


/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

export interface tipoAlmacen {
  idTipoAlm: number
  nombre: string
}

export interface postTipoAlmacen {
  nombre: string
}


/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

export interface tipoEntrada {
  idTipoEntrada: number
  nombre: string
  descripcion: string
}

export interface postTipoEntrada {
  nombre: string
  descripcion: string
}


/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

export interface tipoEntrega {
  idTipoEntrega: number
  nombre: string
  descripcion: string

}

export interface postTipoEntrega {
  nombre: string
  descripcion: string
}

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

export interface tipoMedida {
  idUnidadMe: number
  descripcion: string
}

export interface postTipoMedida {
  descripcion: string
}


/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

export interface postUser {
  idRol: number,
  idRecinto: number,
  usuario1: string,
  nombre: string,
  apellido: string,
  cargo: string,
  correo: string,
  contrasena: string,
  cedula: string,
  telefono: string,
  ext: string,
  celular: string,
  supervisorInmediato: number
}

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

export interface proveedor {
  idProveedor: number,
  rnc: string,
  razonSocial: string,
  nombreComercial: string,
  estadoProveedor: string,
  representante: string,
  telRepresentante: string
}

export interface postProveedor {
  rnc: string,
  razonSocial: string,
  nombreComercial: string,
  estadoProveedor: string,
  representante: string,
  telRepresentante: string
}

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

export interface producto {
  idProducto: number,
  codProducto: string,
  codInstitucional: string,
  auxiliar: {
    id: number,
    denominacion: string
  },
  nombre: string,
  descripcion: string,
  precio: number,
  stock: number,
  stockMinimo: number,
  unidadMedida: {
    idUnidadMe: number,
    descripcion: string
  },
  idTipoArt: {
    idTipoArt: number,
    nombre: string
  }
}

export interface postProducto {
  codPructo: string,
  idAuxiliar: number,
  nombre: string,
  descripcion: string,
  precio: number,
  stock: number,
  stockMinimo: number,
  idUnidadMe: number,
  idTipoArt: number
}
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

export interface rol {
  idRol: number
  descripcion: string
}

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

export interface recinto {
  idRecinto: number
  nombre: string
}


/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


export interface persona {

  id: 0,
  recinto: {
    idRecinto: 0,
    nombre: string
  },
  departamento: {
    idDepar: 0,
    nombre: string
  },
  nombre: string,
  apellido: string,
  cedula: string,
  celular: string,
  telefono: string,
  cargo: string,
  fechaCreacion: Date,
  correo: string
  creadoPorU: {
    idUsuario: 0
    nombre: string,
    apellido: string,
    cargo: string
  }
}

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/*RESPUESTA GET*/

export interface GET {
  data: any
  message: string
  success: boolean
  cantItem: number
  cantPage: number
  currentPage: number
}
