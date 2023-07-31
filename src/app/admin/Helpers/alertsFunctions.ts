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
      title: 'Ocurrio un error, No se pudo guardar.',
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
      let value: boolean

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
