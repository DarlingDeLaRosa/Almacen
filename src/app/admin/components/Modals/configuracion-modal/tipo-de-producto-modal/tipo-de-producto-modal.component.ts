import { AfterViewInit, Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tipoProducto } from 'src/app/admin/models/interfaces';

@Component({
  selector: 'app-tipo-de-producto-modal',
  templateUrl: './tipo-de-producto-modal.component.html',
  styleUrls: ['./tipo-de-producto-modal.component.css']
})
export class TipoDeProductoModalComponent implements AfterViewInit{
  formEditTipoProducto: FormGroup;

  constructor(public fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public item: tipoProducto){
    this.formEditTipoProducto = this.fb.group({
      nombre: new FormControl('', Validators.required) ,
    })
  }

  ngAfterViewInit(){
    this.formEditTipoProducto.setValue({nombre: `${this.item.nombre}`})
  }

  editData(){
    console.log(this.formEditTipoProducto.value)
    //console.log(this.values$)
  }
}
