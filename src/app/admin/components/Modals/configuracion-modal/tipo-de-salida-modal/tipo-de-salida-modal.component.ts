import { Component, Inject, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { tipoSalida } from 'src/app/admin/models/interfaces';
import { alertSameData, alertIsSuccess } from '../../../../Helpers/alertsFunctions';

@Component({
  selector: 'app-tipo-de-salida-modal',
  templateUrl: './tipo-de-salida-modal.component.html',
  styleUrls: ['./tipo-de-salida-modal.component.css'],
})
export class TipoDeSalidaModalComponent implements AfterViewInit {
  formEditTipoSalida: FormGroup;

  constructor(public fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public item: tipoSalida, private dialogRef: MatDialogRef<TipoDeSalidaModalComponent>) {
    this.formEditTipoSalida = this.fb.group({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    })
  }

  ngAfterViewInit() {
    this.formEditTipoSalida.setValue({ nombre: `${this.item.nombre}`, descripcion: `${this.item.descripcion}` })
  }

  closeModal(){
    this.dialogRef.close()
  }

  editData() {
    const respuesta: boolean = true;
    if (this.formEditTipoSalida.valid) {
      if (this.formEditTipoSalida.value.nombre !== this.item.nombre || this.formEditTipoSalida.value.descripcion !== this.item.descripcion) {
        alertIsSuccess(respuesta)
        this.closeModal();
      }else {
        alertSameData()
        this.closeModal();
      }
    }
  }
}
