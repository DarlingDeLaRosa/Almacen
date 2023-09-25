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
    timer: 2000
  })
}

export function alertBackMessage(message: string) {
  Swal.fire({
    icon: 'info',
    title: message,
    showConfirmButton: false,
    timer: 2000
  })
}

export function alertSameSerial() {
  Swal.fire({
    icon: 'info',
    title: 'Numero Serial Duplicado.',
    showConfirmButton: false,
    timer: 2500
  })
}

export function alertUnableToRemove() {
  Swal.fire({
    icon: 'error',
    title: 'No puedes eliminar este producto',
    showConfirmButton: false,
    timer: 2500
  })
}

export function alertSerial() {
  Swal.fire({
    icon: 'info',
    title: 'Campo cantidad deber ser uno',
    showConfirmButton: false,
    timer: 3000
  })
}

export function alertNoValidForm() {
  Swal.fire({
    icon: 'info',
    title: 'Completa los campos requeridos para realizar la acción',
    showConfirmButton: false,
    timer: 2000
  })
}

export function unablePasswordLength() {
  Swal.fire({
    icon: 'info',
    title: 'Contraseña debe ser minimo 6 digitos',
    showConfirmButton: false,
    timer: 2000
  })
}

export function productNameNoExist() {
  Swal.fire({
    icon: 'info',
    title: 'El producto no existe',
    showConfirmButton: false,
    timer: 2000
  })
}


export function unableEmail() {
  Swal.fire({
    icon: 'info',
    title: 'Correo Electronico invalido',
    showConfirmButton: false,
    timer: 2000
  })
}

export function alertCantExis() {
  Swal.fire({
    icon: 'info',
    title: 'Cantidad saliente no puede ser mayor a la cantidad existente.',
    showConfirmButton: false,
    timer: 2000
  })
}

export function alertRncNoFound() {
  Swal.fire({
    icon: 'info',
    title: 'No se encontro RNC que coincida.',
    showConfirmButton: false,
    timer: 2000
  })
}

export function alertProductCodeNoFound() {
  Swal.fire({
    icon: 'info',
    title: 'No se encontro codigo de producto que coincida.',
    showConfirmButton: false,
    timer: 2000
  })
}

export function alertRemoveSure(): Promise<boolean> {
  return new Promise((resolve) => {
    Swal.fire({
      title: '¡Alerta!',
      text: 'Estas seguro que deseas eliminar el tipo de salida.',
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
      text: 'Estas seguro que deseas cerrar la sesion.',
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
    showConfirmButton: false,
    timer: 2000
  })
}


export function loading(load: boolean) {
  if(load){
    Swal.fire({
      width: '200px',
      html: '<div class="loader"></div>',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    })
  }
  else{
    Swal.close();
  }
}