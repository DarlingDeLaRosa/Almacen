import { Component, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipo-producto.component.html',
  styleUrls: ['./tipo-producto.component.css']
})
export class TipoProductoComponent {
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
