import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tipo-entrega',
  templateUrl: './tipo-entrega.component.html',
  styleUrls: ['./tipo-entrega.component.css']
})
export class TipoEntregaComponent{
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
