 import { Component, Inject, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { tipoSalida } from 'src/app/admin/models/interfaces';
import { alertSameData, alertIsSuccess, alertServerDown } from '../../../../Helpers/alertsFunctions';
import { TipoDeSalidaService } from 'src/app/admin/Services/Configuracion/tipo-de-salida.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-tipo-de-salida-modal',
  templateUrl: './tipo-de-salida-modal.component.html',
  styleUrls: ['./tipo-de-salida-modal.component.css'],
})
export class TipoDeSalidaModalComponent implements OnInit {
  formEditTipoSalida: FormGroup;
  url!: string;
  token!: string

  constructor(
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public item: tipoSalida,
    private api: TipoDeSalidaService,
    private dialogRef: MatDialogRef<TipoDeSalidaModalComponent>,
    private store: Store<{ app: AppState }>
  ) {
    this.formEditTipoSalida = this.fb.group({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      idTipoSalida: 0
    })
  }

  ngOnInit() {
    this.formEditTipoSalida.setValue({ nombre: `${this.item.nombre}`, descripcion: `${this.item.descripcion}`, idTipoSalida: this.item.idTipoSalida })

    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
  }

  closeModal() {
    this.dialogRef.close()
  }

  editData() {

    if (this.formEditTipoSalida.valid) {
      if (this.formEditTipoSalida.value.nombre !== this.item.nombre || this.formEditTipoSalida.value.descripcion !== this.item.descripcion) {

        this.api.editTipoSalida(this.url, this.formEditTipoSalida.value, this.token)
          .subscribe((res: any) => {

            let dataTipoSalida = res;

            if (dataTipoSalida.success) {
              alertIsSuccess(true)
              this.closeModal();
            } else {
              alertIsSuccess(false)
              this.closeModal();
            }
            () => {
              alertServerDown();
            }
          })

      } else {
        alertSameData()
        this.closeModal();
      }
    }
  }
}
