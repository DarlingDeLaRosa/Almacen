import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { alertIsSuccess, alertProductCodeNoFound, alertSameData, alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';
import { TipoDeMedidaService } from 'src/app/admin/Services/Configuracion/tipo-de-medida.service';
import { TipoDeProductoService } from 'src/app/admin/Services/Configuracion/tipo-de-producto.service';
import { productoService } from 'src/app/admin/Services/producto.service';
import { producto, tipoMedida, tipoProducto } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  formEditProducto: FormGroup;
  url!: string;
  token!: string
  unidadMedidaList: tipoMedida[] = []
  tipoProductoList: tipoProducto[] = []

  constructor(
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public item: producto,
    private api: productoService,
    private apiTipoMedida: TipoDeMedidaService,
    private apiTipoProducto: TipoDeProductoService,
    private dialogRef: MatDialogRef<ModalComponent>,
    private store: Store<{ app: AppState }>
  ) {
    this.formEditProducto = this.fb.group({
      idCatalogo: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
      stockMinimo: new FormControl('', Validators.required),
      idUnidadMe: new FormControl('', Validators.required),
      idTipoArt: new FormControl('', Validators.required),
      auxiliar: new FormControl(''),
      denominacion: new FormControl(''),
      idProducto: 0,
    })
  }

  ngOnInit() {
    console.log(this.item)
    if (this.item !== null) {

      this.formEditProducto.setValue({
        idProducto: this.item.idProducto,
        idCatalogo: this.item.catalogo.id,
        nombre: this.item.catalogo.nombre,
        descripcion: this.item.descripcion,
        precio: this.item.precio,
        stockMinimo: this.item.stockMinimo,
        idUnidadMe: this.item.unidadMedida.descripcion,
        idTipoArt: this.item.idTipoArt.nombre,
        auxiliar: this.item.catalogo.auxiliar.id,
        denominacion: this.item.catalogo.auxiliar.denominacion
      })

    }
    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });

    this.getUnidadMedida()
    this.getTipoProducto()
  }

  closeModal() {
    this.dialogRef.close()
  }

  findByCodeProduct() {

    if (this.formEditProducto.value.idCatalogo.length >= 5) {

      this.api.findProductoByCode(this.url, this.token, this.formEditProducto.value.idCatalogo)
        .subscribe((res: any) => {
          console.log(res)

          if (res.data !== null) {

            this.formEditProducto.patchValue({
              auxiliar: res.data.auxiliar.id,
              idCatalogo: res.data.id,
              denominacion: res.data.auxiliar.denominacion,
              nombre: res.data.nombre
            })

          } else {
            alertProductCodeNoFound()
            this.formEditProducto.get('idCatalogo')?.reset()
          }
        })
    }
  }

  getUnidadMedida() {
    this.apiTipoMedida.getTipoMedida(this.url, this.token, 1)
      .subscribe((res: any) => {
        if (res) {
          this.unidadMedidaList = res.data
        }
      })
  }

  getTipoProducto() {
    this.apiTipoProducto.getTipoProducto(this.url, this.token, 1)
      .subscribe((res: any) => {
        if (res) {
          this.tipoProductoList = res.data
        }
      })
  }


  findTipoMedidaByName() {
    if (this.formEditProducto.value.idUnidadMe.length >= 2) {

      this.apiTipoMedida.filterTipoMedida(this.url, this.token, 1, this.formEditProducto.value.idUnidadMe)
        .subscribe((res: any) => {

          let options = res.data
          this.unidadMedidaList = []

          options.forEach((item: any) => {
            this.unidadMedidaList.push(item)
          });
        })
    } else {
      this.getUnidadMedida()
    }
  }

  findTipoProductoByName() {
    if (this.formEditProducto.value.idTipoArt.length >= 2) {

      this.apiTipoProducto.filterTipoProducto(this.url, this.token, 1, this.formEditProducto.value.idTipoArt)
        .subscribe((res: any) => {

          let options = res.data
          this.tipoProductoList = []

          options.forEach((item: any) => {
            this.tipoProductoList.push(item)
          });
        })
    } else {
      this.getTipoProducto()
    }
  }

  editData() {

    if (this.formEditProducto.valid) {
      if (
        this.formEditProducto.value.idCatalogo !== this.item.catalogo.id
        || this.formEditProducto.value.nombre !== this.item.nombre
        || this.formEditProducto.value.descripcion !== this.item.descripcion
        || this.formEditProducto.value.precio !== this.item.precio
        || this.formEditProducto.value.stockMinimo !== this.item.stockMinimo
        || this.formEditProducto.value.idUnidadMe !== this.item.unidadMedida.idUnidadMe
        || this.formEditProducto.value.idTipoArt !== this.item.idTipoArt.idTipoArt
        || this.formEditProducto.value.stockMinimo !== this.item.stockMinimo
      ) {

        this.api.editProducto(this.url, this.formEditProducto.value, this.token)
          .subscribe((res: any) => {

            let dataProducto = res;

            if (dataProducto.success) {
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
