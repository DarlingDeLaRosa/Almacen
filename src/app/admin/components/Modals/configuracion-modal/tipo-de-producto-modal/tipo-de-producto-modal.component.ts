import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { tipoProducto } from 'src/app/admin/models/interfaces';
import { alertSameData, alertIsSuccess } from '../../../../Helpers/alertsFunctions';
import { AppState } from 'src/app/store/state';
import { Store } from '@ngrx/store';

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
    @Inject(MAT_DIALOG_DATA)
    public item: tipoProducto,
    private dialogRef: MatDialogRef<TipoDeProductoModalComponent>,
    private store: Store<{ app: AppState }>
  ) {
    this.formEditTipoProducto = this.fb.group({
      nombre: new FormControl('', Validators.required),
      id: 0
    })
  }

  ngOnInit() {
    this.formEditTipoProducto.setValue({ nombre: `${this.item.nombre}`, id:`${this.item.idTipoArt}` })

    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
  }

  closeModal() {
    this.dialogRef.close()
  }

  editData() {

    //if (this.formEditTipoSalida.valid) {
    //  if (this.formEditTipoSalida.value.nombre !== this.item.nombre || this.formEditTipoSalida.value.descripcion !== this.item.descripcion) {
    //
    //    this.api.editTipoSalida(this.url, this.formEditTipoSalida.value, this.token)
    //      .subscribe((res: any) => {
    //
    //        let dataTipoSalida = res;
    //        console.log(dataTipoSalida)
    //
    //        if (dataTipoSalida.success) {
    //          alertIsSuccess(true)
    //          this.closeModal();
    //        } else {
    //          alertIsSuccess(false)
    //          this.closeModal();
    //        }
    //        () => {
    //          alertServerDown();
    //        }
    //      })
    //
    //  } else {
    //    alertSameData()
    //    this.closeModal();
    //  }
    //}
  }
}
