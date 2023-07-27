import Swal from "sweetalert2"

export function resSuccess(respuesta: boolean){
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

export function resSameData(){
  Swal.fire({
    icon: 'info',
    title: 'No se encontraron diferencias.',
    showConfirmButton: false,
    timer: 2000
  })
}
