import { Component, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tipo-entrada',
  templateUrl: './tipo-entrada.component.html',
  styleUrls: ['./tipo-entrada.component.css']
})
export class TipoEntradaComponent {
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
