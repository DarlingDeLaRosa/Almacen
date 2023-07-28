import { AfterViewInit, Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { tipoProducto } from 'src/app/admin/models/interfaces';
import { alertSameData, alertIsSuccess } from '../../../../Helpers/alertsFunctions';

@Component({
  selector: 'app-tipo-de-producto-modal',
  templateUrl: './tipo-de-producto-modal.component.html',
  styleUrls: ['./tipo-de-producto-modal.component.css']
})
export class TipoDeProductoModalComponent implements AfterViewInit{
  formEditTipoProducto: FormGroup;

  constructor(public fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public item: tipoProducto, private dialogRef: MatDialogRef<TipoDeProductoModalComponent>){
    this.formEditTipoProducto = this.fb.group({
      nombre: new FormControl('', Validators.required) ,
    })
  }

  ngAfterViewInit(){
    this.formEditTipoProducto.setValue({nombre: `${this.item.nombre}`})
  }

  closeModal(){
    this.dialogRef.close()
  }

  editData(){
    const respuesta: boolean = true;
    if (this.formEditTipoProducto.valid) {
      if (this.formEditTipoProducto.value.nombre !== this.item.nombre) {
        alertIsSuccess(respuesta)
        this.closeModal();
      }else {
        alertSameData()
        this.closeModal();
      }
    }
  }
}
