import Swal from "sweetalert2"

export function alertIsSuccess(respuesta: boolean) {
  if (respuesta) {

    Swal.fire({
      icon: 'success',
      title: 'Guardado correctamente.',
      showConfirmButton: false,
      timer: 2000
    })

  } else {
    Swal.fire({
      icon: 'error',
      title: 'Ocurrio un error, No se pudo guardar el cambio.',
      text: 'Intente nuevamente.',
      showConfirmButton: true,
      confirmButtonColor: 'red',
    })
  }
}

export function alertSameData() {
  Swal.fire({
    icon: 'info',
    title: 'No se encontraron diferencias.',
    showConfirmButton: false,
    timer: 2500
  })
}

export function alertBackMessage(message: string) {
  Swal.fire({
    icon: 'info',
    title: message,
    showConfirmButton: true,
    confirmButtonColor: '#004b8d'
  })
}

export function alertSameSerial() {
  Swal.fire({
    icon: 'info',
    title: 'Numero Serial Duplicado.',
    showConfirmButton: true,
    confirmButtonColor: '#004b8d'
  })
}

export function alertUnableToRemove() {
  Swal.fire({
    icon: 'error',
    title: 'Este producto no puede ser eliminado debido a que esta en uso.',
    showConfirmButton: true,
    confirmButtonColor: '#004b8d'
  })
}

export function alertSerial() {
  Swal.fire({
    icon: 'info',
    title: 'Campo cantidad deber ser uno',
    showConfirmButton: true,
    confirmButtonColor: '#004b8d'
  })
}

export function alertNoValidForm() {
  Swal.fire({
    icon: 'info',
    title: 'Completa los campos requeridos para realizar la acción',
    showConfirmButton: true,
    confirmButtonColor: '#004b8d'
  })
}

export function unablePasswordLength() {
  Swal.fire({
    icon: 'info',
    title: 'Contraseña debe ser minimo 6 digitos',
    showConfirmButton: true,
    confirmButtonColor: '#004b8d'
  })
}

export function productNameNoExist() {
  Swal.fire({
    icon: 'info',
    title: 'El producto no existe, Verifique el nombre del producto que esta tratando de agregar',
    showConfirmButton: true,
    confirmButtonColor: '#004b8d'
  })
}


export function unableEmail() {
  Swal.fire({
    icon: 'info',
    title: 'Correo Electronico invalido',
    showConfirmButton: true,
    confirmButtonColor: '#004b8d'
  })
}

export function alertCantExis() {
  Swal.fire({
    icon: 'info',
    title: 'Cantidad saliente no puede ser mayor a la cantidad existente.',
    showConfirmButton: true,
    confirmButtonColor: '#004b8d'
  })
}

export function alertNumItems(restante: number) {
  Swal.fire({
    icon: 'info',
    title: `La cantidad restante disponible es ${restante}`,
    showConfirmButton: true,
    confirmButtonColor: '#004b8d'
  })
}

export function alertRncNoFound() {
  Swal.fire({
    icon: 'info',
    title: 'No se encontro RNC que coincida.',
    showConfirmButton: false,
    timer: 2500
  })
}

export function alertProductCodeNoFound() {
  Swal.fire({
    icon: 'info',
    title: 'No se encontro código de producto que coincida.',
    showConfirmButton: false,
    timer: 2500
  })
}

export function alertRemoveSure(): Promise<boolean> {
  return new Promise((resolve) => {
    Swal.fire({
      title: '¡Alerta!',
      text: '¿Estas seguro que deseas eliminar este registro?',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#004b8d',
      cancelButtonColor: '#aaa',
    }).then((result) => {

      if (result.isConfirmed) {
        resolve(true)
      } else {
        resolve(false)
      }
    });
  })
}

export function alertLogOut(): Promise<boolean> {
  return new Promise((resolve) => {
    Swal.fire({
      title: '¡Alerta!',
      text: '¿Estás seguro que deseas cerrar la sesión?',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#004b8d',
      cancelButtonColor: '#aaa',
    }).then((result) => {

      if (result.isConfirmed) {
        resolve(true)
      } else {
        resolve(false)
      }
    });
  })
}

export function alertServerDown() {
  Swal.fire({
    icon: 'error',
    title: 'Se ha producido un error \n No se pudo conectar con el servidor.',
    text: 'Intente mas tarde, Si el error persiste consulte al ADMINISTRADOR.',
    showConfirmButton: true,
    confirmButtonColor: 'red',
  })
}


export function alertWelcome(name: string) {
  Swal.fire({
    title: `Bienvenido ${name}`,
    timer: 2000
  })
}

export function alertRemoveSuccess() {
  Swal.fire({
    icon: 'success',
    title: 'Eliminado correctamente.',
    showConfirmButton: false,
    timer: 2000
  })
}

export function noLessThanO() {
  Swal.fire({
    icon: 'error',
    title: 'Cantidad no puede ser cero.',
    showConfirmButton: false,
    timer: 2000
  })
}

export function alerUserWrong() {
  Swal.fire({
    icon: 'error',
    title: 'Usuario o constraseña incorrectos.',
    showConfirmButton: false,
    timer: 2000
  })
}

export function alertUnableEdit() {
  Swal.fire({
    icon: 'error',
    title: 'Agregar o Limpiar contenido antes de editar o duplicar',
    showConfirmButton: true,
    confirmButtonColor: '#004b8d'
  })
}

export function alertUnableSend() {
  Swal.fire({
    icon: 'error',
    title: 'Agregar o Limpiar informacion de producto antes de enviar',
    showConfirmButton: true,
    confirmButtonColor: '#004b8d'
  })
}


export function loading(load: boolean) {
  if (load) {
    Swal.fire({
      width: '200px',
      padding: 0,
      html: '<div class="loader"></div><h3 style="margin-bottom:7px">Cargando...</h3>',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    })
  }
  else {
    Swal.close();
  }
}
