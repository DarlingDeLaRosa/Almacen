import { Component, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { alertIsSuccess } from '../../../../Helpers/alertsFunctions';

@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipo-producto.component.html',
  styleUrls: ['./tipo-producto.component.css']
})
export class TipoProductoComponent {
  formTipoProducto: FormGroup;

  constructor(public fb: FormBuilder){
    this.formTipoProducto = new FormGroup({
      nombre: new FormControl('', Validators.required),
    })
  }

  sendData() {
    const respuesta: boolean = true;

    if(this.formTipoProducto.valid){
      console.log(this.formTipoProducto.value)

      alertIsSuccess(respuesta)
      this.formTipoProducto.reset()
    }
  }
}
