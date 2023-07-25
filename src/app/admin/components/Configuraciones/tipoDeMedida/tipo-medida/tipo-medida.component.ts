import { Component, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tipo-medida',
  templateUrl: './tipo-medida.component.html',
  styleUrls: ['./tipo-medida.component.css']
})
export class TipoMedidaComponent {
  form: FormGroup;

  constructor(public fb: FormBuilder){
    this.form = new FormGroup({
      descripcion: new FormControl('', Validators.required),
    })
  }

  sendData() {
    console.log(this.form.value)
  }
}
