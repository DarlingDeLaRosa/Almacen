import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs';
import { alertIsSuccess, alertSameData, alertServerDown, loading } from 'src/app/admin/Helpers/alertsFunctions';
import { TipoDeEntregaService } from 'src/app/admin/Services/Configuracion/tipo-de-entrega.service';
import { tipoEntrega } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-tipo-de-entrega-modal',
  templateUrl: './tipo-de-entrega-modal.component.html',
  styleUrls: ['./tipo-de-entrega-modal.component.css']
})
export class TipoDeEntregaModalComponent {
  formEditTipoEntrega: FormGroup;
  url!: string;
  token!: string

  constructor(
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public item: tipoEntrega,
    private api: TipoDeEntregaService,
    private dialogRef: MatDialogRef<TipoDeEntregaModalComponent>,
    private store: Store<{ app: AppState }>
  ) {
    this.formEditTipoEntrega = this.fb.group({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      idTipoEntrega: 0
    })
  }

  ngOnInit() {
    this.formEditTipoEntrega.setValue({ nombre: `${this.item.nombre}`, descripcion: `${this.item.descripcion}`, idTipoEntrega: this.item.idTipoEntrega })

    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
  }

  closeModal() {
    this.dialogRef.close()
  }

  editData() {

    if (this.formEditTipoEntrega.valid) {
      if (this.formEditTipoEntrega.value.nombre !== this.item.nombre || this.formEditTipoEntrega.value.descripcion !== this.item.descripcion) {
        loading(true)

        this.api.editTipoEntrega(this.url, this.formEditTipoEntrega.value, this.token)
        .pipe(
          catchError((error) => {
            loading(false)
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {
            loading(false)

            if (res.data !== null) { alertIsSuccess(true); this.closeModal();} 
            else {alertIsSuccess(false); this.closeModal(); }
          })

      } else {
        alertSameData()
        this.closeModal();
      }
    }
  }
}
