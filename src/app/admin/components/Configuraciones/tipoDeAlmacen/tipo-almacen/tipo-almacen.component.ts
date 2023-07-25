import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tipo-almacen',
  templateUrl: './tipo-almacen.component.html',
  styleUrls: ['./tipo-almacen.component.css']
})
export class TipoAlmacenComponent {
  form: FormGroup;

  constructor(public fb: FormBuilder){
    this.form = new FormGroup({
      nombre: new FormControl('', Validators.required),
    })
  }

  sendData() {
    console.log(this.form.value)
  }
}
