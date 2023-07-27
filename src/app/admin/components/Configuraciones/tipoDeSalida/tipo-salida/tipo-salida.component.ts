import { Component, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { resSuccess } from '../../../Helpers/helperFunction';

@Component({
  selector: 'app-tipo-salida',
  templateUrl: './tipo-salida.component.html',
  styleUrls: ['./tipo-salida.component.css']
})
export class TipoSalidaComponent {
  formTipoSalida: FormGroup;

  constructor(public fb: FormBuilder) {
    this.formTipoSalida = this.fb.group({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    })
  }

  sendData() {
    if (this.formTipoSalida.valid) {

      console.log(this.formTipoSalida.value)

      const respuesta: boolean = true;
      resSuccess(respuesta)
      this.formTipoSalida.reset()
    }
  }
}
