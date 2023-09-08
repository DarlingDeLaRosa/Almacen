import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs';
import { alertIsSuccess, alertSameData, alertServerDown, loading } from 'src/app/admin/Helpers/alertsFunctions';
import { TipoDeAlmacenService } from 'src/app/admin/Services/Configuracion/tipo-de-almacen.service';
import { tipoAlmacen } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-tipo-de-almacen-modal',
  templateUrl: './tipo-de-almacen-modal.component.html',
  styleUrls: ['./tipo-de-almacen-modal.component.css']
})
export class TipoDeAlmacenModalComponent {
  formEditTipoAlmacen: FormGroup;
  url!: string;
  token!: string

  constructor(
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public item: tipoAlmacen,
    private api: TipoDeAlmacenService,
    private dialogRef: MatDialogRef<TipoDeAlmacenModalComponent>,
    private store: Store<{ app: AppState }>
  ) {
    this.formEditTipoAlmacen = this.fb.group({
      nombre: new FormControl('', Validators.required),
      idTipoAlm: 0
    })
  }

  ngOnInit() {
    this.formEditTipoAlmacen.setValue({ nombre: `${this.item.nombre}`, idTipoAlm: this.item.idTipoAlm })

    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
  }

  closeModal() {
    this.dialogRef.close()
  }

  editData() {

    if (this.formEditTipoAlmacen.valid) {
      if (this.formEditTipoAlmacen.value.nombre !== this.item.nombre) {
        loading(true)
        this.api.editTipoAlmacen(this.url, this.formEditTipoAlmacen.value, this.token)
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
            else { alertIsSuccess(false); this.closeModal();}
          })

      } else {
        alertSameData()
        this.closeModal();
      }
    }
  }
}
