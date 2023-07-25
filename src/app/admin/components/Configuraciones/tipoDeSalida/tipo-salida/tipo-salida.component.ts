import { Component, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tipo-salida',
  templateUrl: './tipo-salida.component.html',
  styleUrls: ['./tipo-salida.component.css']
})
export class TipoSalidaComponent {
  form: FormGroup;

  constructor(public fb: FormBuilder){
    this.form = new FormGroup({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    })
  }

  sendData() {
    console.log(this.form.value)
  }
}
