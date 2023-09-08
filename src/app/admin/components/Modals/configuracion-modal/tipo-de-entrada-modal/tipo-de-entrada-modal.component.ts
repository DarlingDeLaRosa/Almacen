import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs';
import { alertIsSuccess, alertSameData, alertServerDown, loading } from 'src/app/admin/Helpers/alertsFunctions';
import { TipoDeEntradaService } from 'src/app/admin/Services/Configuracion/tipo-de-entrada.service';
import { tipoEntrada } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-tipo-de-entrada-modal',
  templateUrl: './tipo-de-entrada-modal.component.html',
  styleUrls: ['./tipo-de-entrada-modal.component.css']
})
export class TipoDeEntradaModalComponent implements OnInit {

  formEditTipoEntrada: FormGroup;
  url!: string;
  token!: string

  constructor(
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public item: tipoEntrada,
    private api: TipoDeEntradaService,
    private dialogRef: MatDialogRef<TipoDeEntradaModalComponent>,
    private store: Store<{ app: AppState }>
  ) {
    this.formEditTipoEntrada = this.fb.group({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      idTipoEntrada: 0
    })
  }

  ngOnInit() {
    this.formEditTipoEntrada.setValue({ nombre: `${this.item.nombre}`, descripcion: `${this.item.descripcion}`, idTipoEntrada: this.item.idTipoEntrada })

    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
  }

  closeModal() {
    this.dialogRef.close()
  }

  editData() {

    if (this.formEditTipoEntrada.valid) {
      if (this.formEditTipoEntrada.value.nombre !== this.item.nombre || this.formEditTipoEntrada.value.descripcion !== this.item.descripcion) {
        loading(true)
        this.api.editTipoEntrada(this.url, this.formEditTipoEntrada.value, this.token)
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
            else { alertIsSuccess(false); this.closeModal(); }
          })

      } else {
        alertSameData()
        this.closeModal();
      }
    }
  }
}
