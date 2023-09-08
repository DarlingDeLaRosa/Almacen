import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs';
import { alertRemoveSure, alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';
import { TipoDeAlmacenService } from 'src/app/admin/Services/Configuracion/tipo-de-almacen.service';
import { TipoDeSalidaService } from 'src/app/admin/Services/Configuracion/tipo-de-salida.service';
import { productoService } from 'src/app/admin/Services/producto.service';
import { salidaService } from 'src/app/admin/Services/salida.service';
import { detalleProductoSalida, producto, tipoAlmacen, tipoSalida } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-edit-salidas',
  templateUrl: './edit-salidas.component.html',
  styleUrls: ['./edit-salidas.component.css']
})
export class EditSalidasComponent {
  formEditSalida: FormGroup;
  formDetalleEditSalida: FormGroup;
  url!: string;
  token!: string
  isSerial: boolean = false
  idRol: number = 0

  detailGroup: detalleProductoSalida[] = [];
  generalITBIS: boolean = true;
  serial: boolean = false;

  tipoSalidaList: tipoSalida[] = []
  tipoAlmacenList: tipoAlmacen[] = []
  tipoDepartamentoList: any[] = [] //tipoDepartamentoList
  productoList: producto[] = []

  constructor(
    public dialog: MatDialog,
    private apiProducto: productoService,
    private apiTipoAlmacen: TipoDeAlmacenService,
    private apiTipoSalida: TipoDeSalidaService,
    private api: salidaService,
    public fb: FormBuilder,
    private store: Store<{ app: AppState }>
  ) {
    this.formEditSalida = this.fb.group({
      fechaCreacion: new FormControl('', Validators.required),
      idTipoSalida: new FormControl('', Validators.required),
      idDepar: new FormControl('', Validators.required),
      observacion: new FormControl('', Validators.required),
      total: 0
    });

    this.formDetalleEditSalida = this.fb.group({
      idProducto: new FormControl('', Validators.required),
      existencia: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required),
      condicion: new FormControl('', Validators.required),
      marca: new FormControl('', Validators.required),
      modelo: new FormControl('', Validators.required),
      serial: new FormControl(''),
      precio: new FormControl(''),
      subTotal: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
    this.store.select(state => state.app.user.role.idRol).subscribe((user: number) => { this.idRol = user; });

    this.getProducto()
    this.getTipoSalida()
    this.getTipoDepartamento()
  }

  getProducto() {
    this.apiProducto.getProducto(this.url, this.token, 1)
      .pipe(
        catchError((error) => {
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        this.productoList = res.data
      });
  }

  getTipoSalida() {
    this.apiTipoSalida.getTipoSalida(this.url, this.token, 1)
      .pipe(
        catchError((error) => {
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        this.tipoSalidaList = res.data
      });
  }

  getTipoDepartamento() {
    this.api.getTipoDepartamento(this.url, this.token, 1)
      .pipe(
        catchError((error) => {
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        console.log(res)
        this.tipoDepartamentoList = res.data
      });
  }

  findProductoByName() {
    if (this.formDetalleEditSalida.value.idProducto.length >= 2) {

      this.apiProducto.filterProducto(this.url, this.token, 1, this.formDetalleEditSalida.value.idProducto)
        .pipe(
          catchError((error) => {
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {
          let options = res.data
          this.productoList = []

          options.forEach((item: any) => {
            this.productoList.push(item)
          });
        })
    } else {
      this.getProducto()
    }
  }

  findTipoSalidaByName() {
    if (this.formEditSalida.value.idTipoSalida.length >= 2) {

      this.apiTipoSalida.filterTipoSalida(this.url, this.token, 1, this.formEditSalida.value.idTipoSalida)
        .pipe(
          catchError((error) => {
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {
          let options = res.data
          this.tipoSalidaList = []

          options.forEach((item: any) => {
            this.tipoSalidaList.push(item)
          });
        })
    } else {
      this.getTipoSalida()
    }
  }

  findTipoDepartamentoByName() {
    if (this.formEditSalida.value.idDepar.length >= 2) {

      this.api.filterTipoDepartamento(this.url, this.token, 1, this.formEditSalida.value.idDepar)
        .pipe(
          catchError((error) => {
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {
          let options = res.data
          this.tipoDepartamentoList = []

          options.forEach((item: any) => {
            this.tipoDepartamentoList.push(item)
          });
        })
    } else {
      this.getTipoDepartamento()
    }
  }

  addDetail() {
    if (this.formDetalleEditSalida.valid) {

      if (this.formEditSalida.valid) {
        this.detailGroup.push(this.formDetalleEditSalida.value)
        this.formDetalleEditSalida.reset()
      }
    }
  }

  editDetail(index: number, item: detalleProductoSalida) {

    this.detailGroup.splice(index, 1)

    this.formDetalleEditSalida.setValue({
      producto: `${item.idProducto}`,
      cantidad: `${item.cantidad}`,
      condicion: `${item.condicion}`,
      marca: `${item.marca}`,
      modelo: `${item.modelo}`,
      precio: `${item.precio}`,
      noSerial: `${item.serial}`,
      existencia: `${item.existencia}`,
    })
  }

  async removeDetail(index: number) {

    let removeChoise: boolean = await alertRemoveSure()

    if (removeChoise) {
      this.detailGroup.splice(index, 1)
    }
  }

  setValueFormProductoSalida(producto: any) {
    console.log(producto)
    let setValuesform = this.productoList.filter((productoEspecifico: any) => {
      return productoEspecifico.nombre == producto
    });

    this.api.findProductoById(this.url, this.token, setValuesform[0].idProducto)
      .pipe(
        catchError((error) => {
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        if (res.data !== null) {
          if (res.data.producto.serial !== null) {
            this.isSerial = true
            this.formDetalleEditSalida.patchValue({
              existencia: new FormControl('', Validators.required),
              condicion: new FormControl('', Validators.required),
              marca: new FormControl('', Validators.required),
              modelo: new FormControl('', Validators.required),
              serial: new FormControl(''),
              precio: new FormControl(''),
            })
          } else {
            this.isSerial = false
            this.formDetalleEditSalida.patchValue({
              existencia: new FormControl('', Validators.required),
              condicion: new FormControl('', Validators.required),
              marca: new FormControl('', Validators.required),
              modelo: new FormControl('', Validators.required),
              precio: new FormControl(''),
            })
          }
        }

      })
  }

  sendData() {

    if (this.formEditSalida.valid) {

      //this.api.postTipoSalida(this.url, this.formTipoSalida.value, this.token)
      //  .subscribe((res: any) => {
      //
      //    dataTipoSalida = res
      //
      //    if (dataTipoSalida.success) {
      //      alertIsSuccess(true)
      //      this.formTipoSalida.reset()
      //    } else {
      //      alertIsSuccess(false)
      //    }
      //    ()=> {
      //      alertServerDown();
      //    }})

    }
  }

}

