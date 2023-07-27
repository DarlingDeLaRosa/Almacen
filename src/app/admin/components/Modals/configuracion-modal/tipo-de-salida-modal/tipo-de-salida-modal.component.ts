import { Component, Inject, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { tipoSalida } from 'src/app/admin/models/interfaces';
import { resSameData, resSuccess } from '../../../Helpers/helperFunction';

@Component({
  selector: 'app-tipo-de-salida-modal',
  templateUrl: './tipo-de-salida-modal.component.html',
  styleUrls: ['./tipo-de-salida-modal.component.css'],
})
export class TipoDeSalidaModalComponent implements AfterViewInit{
  formEditTipoSalida: FormGroup;

  constructor(public fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public item: tipoSalida, private dialogRef: MatDialogRef<TipoDeSalidaModalComponent>){
    this.formEditTipoSalida = this.fb.group({
      nombre: new FormControl('', Validators.required) ,
      descripcion: new FormControl('', Validators.required),
    })
  }

  ngAfterViewInit(){
    this.formEditTipoSalida.setValue({nombre: `${this.item.nombre}`, descripcion: `${this.item.descripcion}`})
  }

  editData(){
    const respuesta: boolean = true;

    if(this.formEditTipoSalida.value.nombre !== this.item.nombre || this.formEditTipoSalida.value.descripcion !== this.item.descripcion)
    {
      resSuccess(respuesta)
      this.dialogRef.close()
      console.log(this.formEditTipoSalida.value.nombre , this.item.nombre)
      console.log(this.formEditTipoSalida.value.descripcion , this.item.descripcion)
    }else{
      resSameData()
      this.dialogRef.close()
    }
    //console.log(this.values$)
  }
}
