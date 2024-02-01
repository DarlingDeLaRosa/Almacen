
export interface Entrada {
  idEntrada: number,
  recinto: {
    idRecinto: number,
    nombre: string
  },
  tipoEntrada: {
    idTipoEntrada: number,
    nombre: string,
    descripcion: string
  },
  tipoEntrega: {
    idTipoEntrega: number,
    nombre: string,
    descripcion: string,
    creador: {
      idUsuario: number,
      nombre: string,
      apellido: string,
      cargo: string
    }
  },
  proveedor: {
    idProveedor: number,
    rnc: string,
    razonSocial: string,
    nombreComercial: string,
    estadoProveedor: string,
    representante: string,
    telRepresentante: string
  },
  numOrden: string,
  noFactura: string,
  fechaFactura: Date,
  fechaCreacion: Date,
  itbisGeneral: number,
  total: number,
  observacion: string,
  itbisGeneralEstado: true,
  fechaModif: Date,
  creadoPor: {
    idUsuario: number,
    nombre: string,
    apellido: string,
    cargo: string
  },
  detalles: [
    {
      idEntradaDet: number,
      idEntrada: number,
      producto: {
        idProducto: number,
        idCatalogo: number,
        codInstitucional: string,
        idAuxiliar: number,
        nombre: string,
        descripcion: string,
        precio: number,
        itbis: number,
        stock: number,
        stockMinimo: number,
        unidadMe: {
          descripcion :string
          idUnidadMe:number
        },
        idTipoArt: number,
        idTipoAlmacen: number
      },
      marca: string,
      modelo: string,
      condicion: string,
      serial: string,
      precio: number,
      itbisProducto: any,
      cantidad: number,
      subTotal: number
    }
  ]
}


export interface postEntrada {
  idTipoEntrada: number,
  idTipoEntrega: number,
  idProveedor: number,
  numOrden: string,
  noFactura: string,
  fechaFactura: Date,
  itbisGeneral: number,
  itbisGeneralEstado: boolean,
  total: number,
  observacion: string
}

export interface putEntrada {
  idEntrada: number,
  idTipoEntrada: number,
  idTipoEntrega: number,
  idProveedor: number,
  numOrden: string,
  noFactura: string,
  fechaFactura: Date,
  itbisGeneral: number,
  total: number,
  observacion: string
}


/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

export interface departamento {

  idDepar: number,
  nombre: string,
  recinto: {
    idRecinto: number,
    nombre: string
  },
  estado: true,
  fechaModif: Date,
  fechaCreacion: Date,
  createdBy: {
    idUsuario: number,
    nombre: string,
    apellido: string,
    cargo: string
  }
}

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

export interface detalleProductoEntrada {
  idProducto: any,
  marca: string,
  modelo: string,
  condicion: string,
  serial: string,
  precio: number,
  cantidad: number,
  itbisProducto: any,
  idTipoAlm: any,
  subTotal: number,
  idEntrada: number
  observacion: string
}


export interface putDetalleProductoEntrada {
  idEntradaDet: number,
  idProducto: number,
  marca: string,
  modelo: string,
  condicion: string,
  serial: string,
  precio: number,
  cantidad: number,
  itbisProducto: any,
  subTotal: number,
  idEntrada: number
  observacion: string
}

export interface detallePutGroup {
  idEntradaDet: number,
  idProducto: any,
  marca: string,
  modelo: string,
  condicion: string,
  serial: string,
  precio: number,
  cantidad: number,
  itbisProducto: number,
  subTotal: number,
  idEntrada: number,
  observacion: string
  idTipoAlm: any
}

export interface detalleEditProductoEntrada {
  producto: {
    codInstitucional: string
    descripcion: string
    idAuxiliar: null
    idCatalogo: number
    idProducto: number
    idTipoArt: number
    idUnidadMe: number
    nombre: string
    itbis: number
    precio: number
    stock: number
    stockMinimo: number
    tipoAlmacen: {
      idTipoAlm: number,
      nombre: string
    }
  }
  marca: string,
  modelo: string,
  condicion: string,
  serial: string,
  precio: number,
  cantidad: number,
  itbisProducto: any,
  idEntradaDet: number
  subTotal: number,
  idEntrada: number
  observacion: string
}

export interface detalleByIdEntrada {

  idEntradaDet: number,
  idEntrada: number,
  producto: {
    idProducto: number,
    idCatalogo: number,
    codInstitucional: string,
    idAuxiliar: number,
    nombre: string,
    descripcion: string,
    precio: number,
    stock: number,
    stockMinimo: number,
    idUnidadMe: number,
    idTipoArt: number
    idTipoAlmacen: number
  },
  marca: string,
  modelo: string,
  condicion: string,
  serial: string,
  precio: number,
  itbisProducto: any,
  cantidad: number,
  subTotal: number
  observacion: string

}

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

export interface salida {

  idSalida: number,
  recinto: {
    idRecinto: number,
    nombre: string
  },
  tipoSalida: {
    idTipoSalida: number,
    nombre: string,
    descripcion: string
  },
  departamento: {
    idDepar: number,
    nombre: string
  },
  creadoPorU: {
    idUsuario: number,
    nombre: string,
    apellido: string,
    cargo: string
    recinto: {
      idRecinto: number
      nombre: string
    }
  },
  fechaCreacion: Date,
  observacion: string,
  total: number,
  fechaModif: Date,
  itbis: number,
  totalGeneral: number
  detalles: [
    {
      idSalidaDet: number,
      producto: {
        idProducto: number,
        idCatalogo: number,
        codInstitucional: string,
        idAuxiliar: number,
        nombre: string,
        descripcion: string,
        precio: number,
        itbis: number | string,
        stock: number,
        stockMinimo: number,
        idUnidadMe: number,
        idTipoArt: number,
        idTipoAlmacen: number
      },
      cantidad: number,
      idSalida: number,
      marca: string,
      modelo: string,
      condicion: string,
      serial: string,
      precio: number,
      subTotal: number
    }
  ]
}

export interface salidaTrans {
  creadoPor: {
    apellido: string
    cargo: string
    idUsuario: number
    nombre: string
    recinto: { idRecinto: number, nombre: string }
  }
  estado: string
  fecha: Date
  id: number
  recinto: { idRecinto: number, nombre: string }
  salida: salida
}

export interface postSalida {
  fecha: Date,
  idTipoSalida: number,
  idDepar: number,
  observacion: string,
  total: number
}

export interface putSalida {
  idSalida: number,
  idTipoSalida: number,
  idDepar: number,
  creadoPor: number,
  observacion: string,
  total: number
}


export interface detalleByIdSalida {

  idSalidaDet: number,
  producto: {
    idProducto: number,
    idCatalogo: number,
    codInstitucional: string,
    idAuxiliar: number,
    nombre: string,
    descripcion: string,
    precio: number,
    stock: number,
    stockMinimo: number,
    idUnidadMe: number,
    idTipoArt: number
  },
  cantidad: number,
  idSalida: number,
  marca: string,
  modelo: string,
  condicion: string,
  serial: string,
  precio: number,
  itbis:number
  totalGeneral: number
  subTotal: number
}
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

export interface detalleProductoSalida {
  cantidad: number,
  condicion: string,
  existencia: number,
  idProducto: any,
  idRecinto: any,
  idSalida: number,
  idSalidaDet: number,
  idTipoAlm: string,
  marca: string,
  modelo: string,
  precio: number,
  serial: string,
  subTotal: number,
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
  codInstitucional: string,
  catalogo: {
    id: number,
    nombre: string,
    definicionProducto: string,
    sinonimos: string,
    auxiliar: {
      id: string,
      denominacion: string
    }
  },
  nombre: string,
  descripcion: string,
  precio: number,
  itbis: any,
  stock: number,
  stockMinimo: number,
  unidadMedida: {
    idUnidadMe: number,
    descripcion: string
  },
  tipoArt: {
    idTipoArt: number,
    nombre: string
  },
  tipoAlmacen: {
    idTipoAlm: number,
    nombre: string
  }
}

export interface postProducto {
  idCatalogo: string,
  nombre: string,
  descripcion: string,
  precio: number,
  itbis: string,
  stockMinimo: number,
  idUnidadMe: number,
  idTipoArt: number,
  idTipoAlmacen: number,
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

  id: number,
  recinto: {
    idRecinto: number,
    nombre: string
  },
  departamento: {
    idDepar: number,
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
    idUsuario: number
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
