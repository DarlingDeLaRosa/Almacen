import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { catchError, throwError } from 'rxjs';
import { alertBackMessage, alertIsSuccess, alertNoValidForm, alertProductCodeNoFound, alertSameData, alertServerDown, loading } from 'src/app/admin/Helpers/alertsFunctions';
import { TipoDeAlmacenService } from 'src/app/admin/Services/Configuracion/tipo-de-almacen.service';
import { TipoDeMedidaService } from 'src/app/admin/Services/Configuracion/tipo-de-medida.service';
import { TipoDeProductoService } from 'src/app/admin/Services/Configuracion/tipo-de-producto.service';
import { productoService } from 'src/app/admin/Services/producto.service';
import { producto, tipoAlmacen, tipoMedida, tipoProducto } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  formEditProducto: FormGroup;
  url!: string;
  token!: string
  unidadMedidaList: tipoMedida[] = []
  tipoProductoList: tipoProducto[] = []
  tipoAlmacenList: tipoAlmacen[] = []

  constructor(
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public item: producto,
    private api: productoService,
    private apiTipoMedida: TipoDeMedidaService,
    private apiTipoProducto: TipoDeProductoService,
    private apiTipoAlmacen: TipoDeAlmacenService,
    private dialogRef: MatDialogRef<ModalComponent>,
    private store: Store<{ app: AppState }>
  ) {
    this.formEditProducto = this.fb.group({
      idCatalogo: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
      itbis: new FormControl('', Validators.required),
      stockMinimo: new FormControl('', Validators.required),
      idUnidadMe: new FormControl('', Validators.required),
      idTipoArt: new FormControl('', Validators.required),
      idTipoAlmacen: new FormControl('', Validators.required),
      auxiliar: new FormControl(''),
      denominacion: new FormControl(''),
      idProducto: 0,
    })
  }

  ngOnInit() {
    if (this.item !== null) {

      this.formEditProducto.setValue({
        idProducto: this.item.idProducto,
        idCatalogo: this.item.catalogo.id,
        nombre: this.item.catalogo.nombre,
        descripcion: this.item.descripcion,
        itbis: this.item.itbis,
        precio: this.item.precio,
        stockMinimo: this.item.stockMinimo,
        idUnidadMe: this.item.unidadMedida.descripcion,
        idTipoArt: this.item.tipoArt.nombre,
        auxiliar: this.item.catalogo.auxiliar.id,
        denominacion: this.item.catalogo.auxiliar.denominacion,
        idTipoAlmacen: this.item.tipoAlmacen.nombre,
      })

    }
    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });

    this.getUnidadMedida();
    this.getTipoProducto();
    this.getTipoAlmacen();

  }

  closeModal() {
    this.dialogRef.close()
  }

  findByCodeProduct() {

    if (this.formEditProducto.value.idCatalogo.length >= 5) {
      this.api.findProductoByCode(this.url, this.token, this.formEditProducto.value.idCatalogo)
        .pipe(
          catchError((error) => {
            alertServerDown();
            return throwError(error);
          })
        )
        .subscribe((res: any) => {
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
            this.formEditProducto.get('nombre')?.reset()
            this.formEditProducto.get('auxiliar')?.reset()
            this.formEditProducto.get('denominacion')?.reset()
          }
        })
    }
  }

  getTipoAlmacen() {
    this.apiTipoAlmacen.getTipoAlmacen(this.url, this.token, 1, 200)
      .pipe(
        catchError((error) => {
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        this.tipoAlmacenList = res.data
      });
  }

  getUnidadMedida() {
    this.apiTipoMedida.getTipoMedida(this.url, this.token, 1, 200)
      .pipe(
        catchError((error) => {
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        if (res) {
          this.unidadMedidaList = res.data
        }
      })
  }

  getTipoProducto() {
    this.apiTipoProducto.getTipoProducto(this.url, this.token, 1, 200)
      .pipe(
        catchError((error) => {
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        if (res) {
          this.tipoProductoList = res.data
        }
      })
  }


  findTipoMedidaByName() {
    if (this.formEditProducto.value.idUnidadMe.length >= 2) {

      this.apiTipoMedida.filterTipoMedida(this.url, this.token, 1, this.formEditProducto.value.idUnidadMe)
        .pipe(
          catchError((error) => {
            alertServerDown();
            return error;
          })
        )
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
        .pipe(
          catchError((error) => {
            alertServerDown();
            return error;
          })
        )
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

  findTipoAlmacenByName() {
    if (this.formEditProducto.value.idTipoAlm.length >= 2) {

      this.apiTipoAlmacen.filterTipoAlmacen(this.url, this.token, 1, this.formEditProducto.value.idTipoAlm)
        .pipe(
          catchError((error) => {
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {

          let options = res.data
          this.tipoAlmacenList = []

          options.forEach((item: any) => {
            this.tipoAlmacenList.push(item)
          });
        })
    } else {
      this.getTipoAlmacen()
    }
  }

  editData() {

    if (this.formEditProducto.valid && this.item != null) {

      let idUnidadM = this.unidadMedidaList.filter(item => item.descripcion === this.formEditProducto.value.idUnidadMe)
      let idTipoP = this.tipoProductoList.filter(item => item.nombre === this.formEditProducto.value.idTipoArt)
      let idTipoAl = this.tipoAlmacenList.filter(item => item.nombre === this.formEditProducto.value.idTipoAlmacen)

      this.formEditProducto.value.idTipoAlmacen = idTipoAl[0].idTipoAlm
      this.formEditProducto.value.idUnidadMe = idUnidadM[0].idUnidadMe
      this.formEditProducto.value.idTipoArt = idTipoP[0].idTipoArt


      if (
        this.formEditProducto.value.idCatalogo !== this.item.catalogo.id
        || this.formEditProducto.value.nombre !== this.item.nombre
        || this.formEditProducto.value.descripcion !== this.item.descripcion
        || this.formEditProducto.value.precio !== this.item.precio
        || this.formEditProducto.value.stockMinimo !== this.item.stockMinimo
        || this.formEditProducto.value.idUnidadMe !== this.item.unidadMedida.idUnidadMe
        || this.formEditProducto.value.idTipoArt !== this.item.tipoArt.idTipoArt
        || this.formEditProducto.value.stockMinimo !== this.item.stockMinimo
        || this.formEditProducto.value.itbis !== this.item.itbis
        || this.formEditProducto.value.idTipoAlmacen !== this.item.tipoAlmacen.nombre
      ) {
        loading(true)
        
        this.api.editProducto(this.url, JSON.stringify(this.formEditProducto.value), this.token)
          .pipe(
            catchError((error) => {
              loading(false)
              alertServerDown();
              return throwError(error);
            })
          )
          .subscribe((res: any) => {
            loading(false)
            
            if (res.data !== null) { alertIsSuccess(true); this.closeModal(); }
            else { alertBackMessage(res.message); this.closeModal(); }
          })

      } else {
        alertSameData()
        this.closeModal();
      }
    } else if (this.formEditProducto.valid && this.item == null) {

      this.formEditProducto.removeControl('idProducto')
      
      let idUnidadM = this.unidadMedidaList.filter(item => item.descripcion === this.formEditProducto.value.idUnidadMe)
      let idTipoP = this.tipoProductoList.filter(item => item.nombre === this.formEditProducto.value.idTipoArt)
      let idTipoAl = this.tipoAlmacenList.filter(item => item.nombre === this.formEditProducto.value.idTipoAlmacen)

      this.formEditProducto.value.idTipoAlmacen = idTipoAl[0].idTipoAlm
      this.formEditProducto.value.idUnidadMe = idUnidadM[0].idUnidadMe
      this.formEditProducto.value.idTipoArt = idTipoP[0].idTipoArt

      loading(true)
      
      this.api.postProducto(this.url, JSON.stringify(this.formEditProducto.value), this.token)
        .pipe(
          catchError((error) => {
            loading(false)
            alertServerDown();
            return throwError(error);
          })
        )
        .subscribe((res: any) => {
          loading(false)
          if (res.data !== null) { alertIsSuccess(true); this.closeModal(); }
          else { alertIsSuccess(false); this.closeModal(); }
        })

    } else {
      alertNoValidForm()
    }
  }
}
