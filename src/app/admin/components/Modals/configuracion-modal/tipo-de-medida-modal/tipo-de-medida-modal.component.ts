import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs';
import { alertIsSuccess, alertSameData, alertServerDown, loading } from 'src/app/admin/Helpers/alertsFunctions';
import { TipoDeMedidaService } from 'src/app/admin/Services/Configuracion/tipo-de-medida.service';
import { tipoMedida } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-tipo-de-medida-modal',
  templateUrl: './tipo-de-medida-modal.component.html',
  styleUrls: ['./tipo-de-medida-modal.component.css']
})
export class TipoDeMedidaModalComponent implements OnInit {
  formEditTipoMedida: FormGroup;
  url!: string;
  token!: string

  constructor(
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public item: tipoMedida,
    private api: TipoDeMedidaService,
    private dialogRef: MatDialogRef<TipoDeMedidaModalComponent>,
    private store: Store<{ app: AppState }>
  ) {
    this.formEditTipoMedida = this.fb.group({
      descripcion: new FormControl('', Validators.required),
      idUnidadMe: 0
    })
  }

  ngOnInit() {
    this.formEditTipoMedida.setValue({ descripcion: `${this.item.descripcion}`, idUnidadMe: this.item.idUnidadMe })

    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
  }

  closeModal() {
    this.dialogRef.close()
  }

  editData() {

    if (this.formEditTipoMedida.valid) {
      if (this.formEditTipoMedida.value.descripcion !== this.item.descripcion) {
        loading(true)
        this.api.editTipoMedida(this.url, this.formEditTipoMedida.value, this.token)
          .pipe(
            catchError((error) => {
              loading(false)
              alertServerDown();
              return error;
            })
          )
          .subscribe((res: any) => {
            loading(false)

            if (res.data !== null) { alertIsSuccess(true); this.closeModal(); }
            else { alertIsSuccess(false); this.closeModal(); }
          })

      } else {
        alertSameData()
        this.closeModal();
      }
    }
  }
}
