import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs';
import { alertIsSuccess, alertSameData, alertServerDown, loading } from 'src/app/admin/Helpers/alertsFunctions';
import { proveedorService } from 'src/app/admin/Services/proveedor.service';
import { proveedor } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-proveedor-modal',
  templateUrl: './proveedor-modal.component.html',
  styleUrls: ['./proveedor-modal.component.css']
})
export class ProveedorModalComponent {
  formEditProveedor: FormGroup;
  url!: string;
  token!: string
  filterOptions: any = []

  constructor(
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public item: proveedor,
    private api: proveedorService,
    private dialogRef: MatDialogRef<ProveedorModalComponent>,
    private store: Store<{ app: AppState }>
  ) {
    this.formEditProveedor = this.fb.group({
      idProveedor: 0,
      rnc: new FormControl('', Validators.required),
      razonSocial: new FormControl('', Validators.required),
      nombreComercial: new FormControl('', Validators.required),
      representante: new FormControl('', Validators.required),
      telRepresentante: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
    this.formEditProveedor.setValue({
      idProveedor: this.item.idProveedor,
      rnc: `${this.item.rnc}`,
      razonSocial: `${this.item.razonSocial}`,
      nombreComercial: `${this.item.nombreComercial}`,
      representante: `${this.item.representante}`,
      telRepresentante: `${this.item.telRepresentante}`,
    })

    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
  }

  closeModal() {
    this.dialogRef.close()
  }

  findByName() {
    if (this.formEditProveedor.value.razonSocial.length >= 5) {

      this.api.findProveedorByRS(this.url, this.token, this.formEditProveedor.value.razonSocial)
        .pipe(
          catchError((error) => {
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {
          let options = res.data
          this.filterOptions = []
          options.forEach((item: any) => {
            this.filterOptions.push(item)
          });
        })
    }
  }

  findByRNC() {
    this.api.findProveedorByRNC(this.url, this.token, this.formEditProveedor.value.rnc)
      .pipe(
        catchError((error) => {
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        if (res.data !== null) {
          this.formEditProveedor.patchValue({
            razonSocial: res.data.razonSocial,
            nombreComercial: res.data.nombreComercial,
          })
        }
      })
  }

  setValueformEditProveedores(proveedor: any) {
    let setValuesform = this.filterOptions.filter((proveedorEspecifico: any) => {
      return proveedorEspecifico.razonSocial == proveedor
    });

    this.formEditProveedor.patchValue({
      rnc: setValuesform[0].rnc,
      nombreComercial: setValuesform[0].nombreComercial,
    })
  }

  editData() {

    if (this.formEditProveedor.valid) {
      if (
        this.formEditProveedor.value.rnc !== this.item.rnc
        || this.formEditProveedor.value.razonSocial !== this.item.razonSocial
        || this.formEditProveedor.value.nombreComercial !== this.item.nombreComercial
        || this.formEditProveedor.value.representante !== this.item.representante
        || this.formEditProveedor.value.telRepresentante !== this.item.telRepresentante
      ) {
        loading(true)
        this.api.editProveedor(this.url, this.formEditProveedor.value, this.token)
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
