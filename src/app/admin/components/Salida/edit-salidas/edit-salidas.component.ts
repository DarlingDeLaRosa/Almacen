import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, combineLatest, throwError } from 'rxjs';
import { alertCantExis, alertIsSuccess, alertNoValidForm, alertRemoveSure, alertSameSerial, alertSerial, alertServerDown, alertUnableEdit, loading } from 'src/app/admin/Helpers/alertsFunctions';
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
  resultSubTotal: number = 0
  respuesta: any

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
    private router: Router,
    private route: ActivatedRoute,
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
      idSalida: 0,
      total: 0
    });

    this.formDetalleEditSalida = this.fb.group({
      idProducto: new FormControl('', Validators.required),
      existencia: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required),
      condicion: new FormControl('', Validators.required),
      marca: new FormControl('', Validators.required),
      modelo: new FormControl('', Validators.required),
      idTipoAlm: new FormControl(''),
      serial: new FormControl(''),
      precio: new FormControl(''),
      subTotal: new FormControl(''),
      idSalida: 0,
      idSalidaDet: 0
    })
  }

  ngOnInit(): void {
    let id: number = 0

    this.route.paramMap.subscribe(params => {
      const idparam = params.get('id');
      if (idparam !== null) id = parseInt(idparam)
      console.log(id)
    })

    combineLatest([
      this.store.select(state => state.app.token),
      this.store.select(state => state.app.path),
      this.store.select(state => state.app.user.role.idRol)
    ]).subscribe(([tokenValue, pathvalue, idRole]) => {

      this.url = pathvalue;
      this.token = tokenValue;
      this.idRol = idRole;

      loading(true)

      this.api.getSalidaById(this.url, this.token, id)
        .pipe(
          catchError((error) => {
            loading(false)
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {
          loading(false)
          let detalleList: any[] = []
          this.respuesta = res.data.detalles
          console.log(this.respuesta)

          if (res.success && res.data !== null) {
            this.formEditSalida.patchValue({
              fechaCreacion: res.data.fechaCreacion,
              idTipoSalida: res.data.tipoSalida.nombre,
              idDepar: res.data.departamento.nombre,
              observacion: res.data.observacion,
              idSalida: res.data.idSalida
            })

            detalleList = res.data.detalles

            detalleList.map(detalle => {

              this.formDetalleEditSalida.patchValue({
                idProducto: detalle.producto.nombre,
                existencia: detalle.producto.stock,
                cantidad: detalle.cantidad,
                idTipoAlm: detalle.producto.tipoAlmacen.nombre,
                condicion: detalle.condicion,
                marca: detalle.marca,
                modelo: detalle.modelo,
                serial: detalle.serial,
                precio: detalle.producto.precio,
                subTotal: detalle.subTotal,
                idSalida: detalle.idSalida,
                idSalidaDet: detalle.idSalidaDet
              })

              this.addDetail()
              this.formDetalleEditSalida.reset()
            })
          }
        })

    })

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
    console.log(this.formDetalleEditSalida.value)

    if (this.formDetalleEditSalida.valid && this.formEditSalida.valid) {

      console.log(this.serial)

      if (this.serial == false && this.formDetalleEditSalida.value.cantidad == 1 ||
        this.serial == false && this.formDetalleEditSalida.value.cantidad !== 1 ||
        this.serial == true && this.formDetalleEditSalida.value.cantidad == 1
      ) {
        
        if (this.detailGroup.length >= 1 && this.serial == false) {
          if (this.detailGroup.some(producto => producto.serial.toUpperCase() == this.formDetalleEditSalida.value.serial.toUpperCase())) {
            alertSameSerial()
            return
          }
        }
        // let editStock: boolean = false

        // if(this.formDetalleEditSalida.value.idSalidaDet !== null || this.formDetalleEditSalida.value.idSalidaDet !== 0
        //   && this.formDetalleEditSalida.value.cantidad <= 
        //   this.formDetalleEditSalida.value.existencia + this.formDetalleEditSalida.value.cantidad){
        //   editStock = true
        // }else{
        //   return
        // }

        //|| editStock
        if (this.isSerial == true && this.formDetalleEditSalida.value.cantidad == 1 || this.isSerial == false ) {

          this.detailGroup.push(this.formDetalleEditSalida.value)
          this.resultSubTotal += this.formDetalleEditSalida.value.subTotal
          this.formDetalleEditSalida.reset()
  
        }
      }
       else {
        alertSerial()
      }

    } else {
      alertNoValidForm()
    }

    console.log(this.detailGroup)
  }

  clearDetail() {
    this.formDetalleEditSalida.reset()
  }

  editDetail(index: number, item: detalleProductoSalida) {
    console.log(item)
    if (!this.formDetalleEditSalida.valid) {

      this.detailGroup.splice(index, 1)

      this.formDetalleEditSalida.patchValue({
        idProducto: item.idProducto,
        cantidad: item.cantidad,
        condicion: item.condicion,
        marca: item.marca,
        modelo: item.modelo,
        precio: item.precio,
        serial: item.serial,
        existencia: item.existencia,
        idTipoAlm: item.idTipoAlm,
        subTotal: item.subTotal,
        idSalida: item.idSalida,
        idSalidaDet: item.idSalidaDet,
      })

      console.log(this.formDetalleEditSalida.value)
      this.resultSubTotal -= item.subTotal
    } else {
      alertUnableEdit()
    }
  }

  async removeDetail(index: number) {

    let removeChoise: boolean = await alertRemoveSure()

    if (removeChoise) {
      this.detailGroup.splice(index, 1)
    }
  }

  setValueFormProductoSalida(producto: any) {
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
        console.log(res)
        if (res.data !== null) {

          if (res.data.serial.length > 0) {

            this.isSerial = true

            this.formDetalleEditSalida.patchValue({
              existencia: res.data.producto.stock,
              condicion: res.data.condicion,
              marca: res.data.marca,
              idTipoAlm: res.data.producto.tipoAlmacen.nombre,
              modelo: res.data.modelo,
              precio: res.data.producto.precio,
              serial: res.data.serial,
            })

          } else {

            this.isSerial = false

            this.formDetalleEditSalida.patchValue({
              existencia: res.data.producto.stock,
              condicion: res.data.condicion,
              marca: res.data.marca,
              idTipoAlm: res.data.producto.tipoAlmacen.nombre,
              modelo: res.data.modelo,
              precio: res.data.producto.precio,
            })

          }
        }
      })
  }

  subTotalResult() {
    this.formDetalleEditSalida.patchValue({
      subTotal: this.formDetalleEditSalida.value.cantidad * this.formDetalleEditSalida.value.precio
    })
  }

  sendData() {

    let idTipoSa = this.tipoSalidaList.filter(item => item.nombre === this.formEditSalida.value.idTipoSalida)
    this.formEditSalida.value.idTipoSalida = idTipoSa[0].idTipoSalida

    let idTipoDep = this.tipoDepartamentoList.filter(item => item.nombre === this.formEditSalida.value.idDepar)
    this.formEditSalida.value.idDepar = idTipoDep[0].idDepar

    this.formEditSalida.value.total = this.resultSubTotal

    if (this.formEditSalida.valid) {

      loading(true)

      this.api.editSalida(this.url, this.formEditSalida.value, this.token)
        .pipe(
          catchError((error) => {
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {
          if (res.success && res.data !== null) {

            this.detailGroup.map((detail: any) => {

              let idsDetalles = this.respuesta.filter((detalle: any) => {
                if (detalle.idSalidaDet == detail.idSalidaDet && detalle.producto.nombre == detail.idProducto) {
                  return detalle
                }
              })

              let idTipoProD = this.productoList.filter(item => item.nombre === detail.idProducto)

              detail.idProducto = idTipoProD[0].idProducto
              detail.idTipoAlm = idTipoProD[0].tipoAlmacen.idTipoAlm
              detail.idSalida = res.data.idSalida

              if (idsDetalles.length == 0) {
                detail.idSalidaDet = null
              }
            })

            console.log(JSON.stringify(this.detailGroup))

            this.api.postDetalleSalida(this.url, JSON.stringify(this.detailGroup), this.token)
              .pipe(
                catchError((error) => {
                  loading(false)
                  alertServerDown();
                  return throwError(error);
                })
              )
              .subscribe((res: any) => {
                console.log(res)
                loading(false)

                if (res.data !== null) {
                  alertIsSuccess(true)

                  this.formEditSalida.reset()
                  this.detailGroup = []
                  this.resultSubTotal = 0

                  this.router.navigate(['/almacen/administrar-salida'])

                }
                else {
                  alertIsSuccess(false)
                }
              })
          } else {
            alertIsSuccess(false)
          }
        })
    }

  }

}

