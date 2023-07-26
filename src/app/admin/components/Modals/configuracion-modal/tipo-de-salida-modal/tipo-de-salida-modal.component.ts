import { Component, Inject, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { tipoSalida } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-tipo-de-salida-modal',
  templateUrl: './tipo-de-salida-modal.component.html',
  styleUrls: ['./tipo-de-salida-modal.component.css'],
})
export class TipoDeSalidaModalComponent implements AfterViewInit{
  formEditTipoSalida: FormGroup;

  constructor(public fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public item: tipoSalida){
    this.formEditTipoSalida = this.fb.group({
      nombre: new FormControl('', Validators.required) ,
      descripcion: new FormControl('', Validators.required),
    })
  }

  ngAfterViewInit(){
    this.formEditTipoSalida.setValue({nombre: `${this.item.nombre}`, descripcion: `${this.item.descripcion}`})
  }

  editData(){
    console.log(this.formEditTipoSalida.value)
    //console.log(this.values$)
  }
}
