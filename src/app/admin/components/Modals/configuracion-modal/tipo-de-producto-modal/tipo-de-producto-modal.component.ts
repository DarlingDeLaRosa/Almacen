import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { tipoProducto } from 'src/app/admin/models/interfaces';
import { alertSameData, alertIsSuccess, alertServerDown, loading } from '../../../../Helpers/alertsFunctions';
import { AppState } from 'src/app/store/state';
import { Store } from '@ngrx/store';
import { TipoDeProductoService } from 'src/app/admin/Services/Configuracion/tipo-de-producto.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-tipo-de-producto-modal',
  templateUrl: './tipo-de-producto-modal.component.html',
  styleUrls: ['./tipo-de-producto-modal.component.css']
})
export class TipoDeProductoModalComponent implements OnInit {
  formEditTipoProducto: FormGroup;
  url!: string;
  token!: string


  constructor(
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public item: tipoProducto,
    private api: TipoDeProductoService,
    private dialogRef: MatDialogRef<TipoDeProductoModalComponent>,
    private store: Store<{ app: AppState }>
  ) {
    this.formEditTipoProducto = this.fb.group({
      nombre: new FormControl('', Validators.required),
      idTipoArt: 0
    })
  }

  ngOnInit() {
    console.log(this.item)
    this.formEditTipoProducto.setValue({ nombre: `${this.item.nombre}`, idTipoArt: `${this.item.idTipoArt}` })

    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
  }

  closeModal() {
    this.dialogRef.close()
  }

  editData() {

    if (this.formEditTipoProducto.valid) {
      if (this.formEditTipoProducto.value.nombre !== this.item.nombre) {
        loading(true)
        this.api.editTipoProducto(this.url, this.formEditTipoProducto.value, this.token)
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
