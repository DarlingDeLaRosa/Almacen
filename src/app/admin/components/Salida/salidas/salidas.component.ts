import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { catchError, combineLatest, throwError } from 'rxjs';
import { alertCantExis, alertIsSuccess, alertNoValidForm, alertNumItems, alertRemoveSure, alertSameSerial, alertSerial, alertServerDown, alertUnableEdit, alertUnableSend, loading, noLessThanO, productNameNoExist } from 'src/app/admin/Helpers/alertsFunctions';
import { TipoDeSalidaService } from 'src/app/admin/Services/Configuracion/tipo-de-salida.service';
import { UserService } from 'src/app/admin/Services/Configuracion/usuarios.service';
import { productoService } from 'src/app/admin/Services/producto.service';
import { salidaService } from 'src/app/admin/Services/salida.service';
import { departamento, detalleProductoSalida, producto, recinto, tipoSalida } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.css']
})
export class SalidasComponent implements OnInit {
  formSalida: FormGroup;
  formDetalleSalida: FormGroup;
  url!: string;
  token!: string
  isSerial: boolean = false
  isTransferencia: boolean = false
  idRol: number = 0
  resultSubTotal: number = 0
  recintoActual: string = ''
  listadeProducto: any[] = []
  idProductoList: producto[] = []
  cantidadItem: number = 0

  detailGroup: detalleProductoSalida[] = [];
  generalITBIS: boolean = true;

  tipoSalidaList: tipoSalida[] = []
  productoList: producto[] = []
  tipoDepartamentoList: departamento[] = []
  recintoList: recinto[] = []

  constructor(
    public dialog: MatDialog,
    private apiProducto: productoService,
    private apiRecinto: UserService,
    private apiTipoSalida: TipoDeSalidaService,
    private api: salidaService,
    public fb: FormBuilder,
    private store: Store<{ app: AppState }>
  ) {
    this.formSalida = this.fb.group({
      fechaCreacion: new FormControl('', Validators.required),
      idTipoSalida: new FormControl('', Validators.required),
      idDepar: new FormControl(''),
      idRecinto: new FormControl(''),
      observacion: new FormControl('', Validators.required),
      total: 0
    });

    this.formDetalleSalida = this.fb.group({
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
    })
  }

  ngOnInit(): void {
    combineLatest([
      this.store.select(state => state.app.token),
      this.store.select(state => state.app.path),
      this.store.select(state => state.app.user.role.idRol),
      this.store.select(state => state.app.user.recinto.nombre),
    ]).subscribe(([tokenValue, pathValue, idRole, recintoNombre]) => {

      this.url = pathValue;
      this.token = tokenValue;
      this.idRol = idRole
      this.recintoActual = recintoNombre

      this.getProducto()
      this.getTipoSalida()
      this.getTipoDepartamento()
      this.getRecinto()
    })
  }

  getRecinto() {
    this.recintoList = []

    this.apiRecinto.getRecinto(this.url, this.token)
      .pipe(
        catchError((error) => {
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        if (res !== null) {
          res.data.map((recinto: any) => {
            if (recinto.nombre !== this.recintoActual) this.recintoList.push(recinto)
          })
        }
      })
  }

  getProducto() {
    this.productoList = []

    this.apiProducto.getProducto(this.url, this.token, 1, 400)
      .pipe(
        catchError((error) => {
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {

        this.idProductoList = res.data
        console.log(this.idProductoList);

        res.data.map((producto: any) => {
          if (producto.stock !== 0) this.productoList.push(producto)
        })
      });
  }

  getTipoSalida() {
    this.apiTipoSalida.getTipoSalida(this.url, this.token, 1, 400)
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
    this.api.getTipoDepartamento(this.url, this.token, 1, 400)
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
    if (this.formDetalleSalida.value.idProducto.length >= 2) {

      this.apiProducto.filterProducto(this.url, this.token, 1, this.formDetalleSalida.value.idProducto)
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
            if (item.stock !== 0) this.productoList.push(item)
          });
        })
    } else {
      this.getProducto()
    }
  }

  findTipoSalidaByName() {
    if (this.formSalida.value.idTipoSalida.length >= 2) {

      this.apiTipoSalida.filterTipoSalida(this.url, this.token, 1, this.formSalida.value.idTipoSalida)
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
    if (this.formSalida.value.idDepar.length >= 2) {

      this.api.filterTipoDepartamento(this.url, this.token, 1, this.formSalida.value.idDepar)
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
    const exisProducto = this.productoList.some(producto => {
      return producto.descripcion === this.formDetalleSalida.value.idProducto;
    });

    if (this.formDetalleSalida.value.cantidad < 1) {
      noLessThanO()
      return
    }

    if (this.formDetalleSalida.valid && this.formSalida.valid) {
      if (exisProducto) {

        if (this.isSerial == true && this.formDetalleSalida.value.cantidad == 1 || this.isSerial == false) {

          if (this.detailGroup.length > 0 && this.isSerial) {
            if (this.detailGroup.some(producto => {
              if (producto.serial && this.formDetalleSalida.value.serial) {
                return producto.serial.toUpperCase() == this.formDetalleSalida.value.serial.toUpperCase() || this.formDetalleSalida.value.serial == "N/A"
              }
              return false
            }
            )) {
              alertSameSerial()
              return
            }
          }

          if (this.formDetalleSalida.value.cantidad <= this.formDetalleSalida.value.existencia) {

            if (!this.isSerial) {
              let cantidadTotal: number = 0
              let detailSerialNoExist = this.detailGroup.filter(detalle => detalle.serial == null && detalle.idProducto == this.formDetalleSalida.value.idProducto)

              if (detailSerialNoExist.length > 0) {

                detailSerialNoExist.map((detalle: any) => {
                  cantidadTotal += detalle.cantidad
                })

                if (cantidadTotal + this.formDetalleSalida.value.cantidad > this.formDetalleSalida.value.existencia) {
                  alertNumItems(this.formDetalleSalida.value.existencia - cantidadTotal)
                  if (this.formDetalleSalida.value.existencia - cantidadTotal == 0) this.formDetalleSalida.reset()
                  return
                }
              }
            }

            this.detailGroup.push(this.formDetalleSalida.value)

            if (this.isSerial) {
              const exisProducts = this.detailGroup.some(producto => {
                return producto.idProducto === this.formDetalleSalida.value.idProducto;
              });

              if (exisProducts && this.listadeProducto.length == 0) { //|| !exisProducts && this.detailGroup.length > 0
                this.productoList = this.productoList.filter(detalle => detalle.descripcion != this.formDetalleSalida.value.idProducto)
              }
            }

            //this.resultSubTotal += this.formDetalleSalida.value.subTotal
            this.sumaTotal()
            this.formDetalleSalida.reset()

          } else {
            alertCantExis()
          }
        } else {
          alertSerial()
        }
      } else {
        productNameNoExist()
      }
    } else {
      alertNoValidForm()
    }
  }

  editDetail(index: number, item: detalleProductoSalida) {

    if (!this.formDetalleSalida.valid) {

      this.detailGroup.splice(index, 1)

      this.formDetalleSalida.patchValue({
        idProducto: item.idProducto,
        cantidad: item.cantidad,
        condicion: item.condicion,
        marca: item.marca,
        modelo: item.modelo,
        precio: item.precio,
        serial: item.serial,
        existencia: item.existencia,
        idTipoAlm: item.idTipoAlm,
        subTotal: item.subTotal
      })

      if (item.serial != null && item.serial.length > 0) {
        this.isSerial = true
        this.formDetalleSalida.patchValue({ serial: item.serial })
      } else {
        this.isSerial = false
      }
      //this.resultSubTotal -= item.subTotal
    } else {
      alertUnableEdit()
    }


    this.sumaTotal()
  }

  subTotalResult() {
    this.formDetalleSalida.patchValue({
      subTotal: this.formDetalleSalida.value.cantidad * this.formDetalleSalida.value.precio
    })
  }

  async removeDetail(index: number, item: detalleProductoSalida) {

    let removeChoise: boolean = await alertRemoveSure()

    if (removeChoise) {
      this.detailGroup.splice(index, 1)
      //this.resultSubTotal -= item.subTotal
    }
    this.sumaTotal()
  }

  clearDetail() {
    this.formDetalleSalida.reset()
  }

  setValueTransfer(producto: string) {
    if (producto === "Prestamo" || producto === 'Donación') {
      this.isTransferencia = true
    } else {
      this.isTransferencia = false
    }
  }

  setValueFormProductoSalida(producto: string) {

    this.formDetalleSalida.reset()
    this.formDetalleSalida.patchValue({ idProducto: producto })

    let setValuesform = this.productoList.filter((productoEspecifico: any) => {
      return productoEspecifico.descripcion == producto
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

          // this.formDetalleSalida.patchValue({
          //   existencia: res.data.producto.stock,
          //   condicion: res.data.condicion,
          //   marca: res.data.marca,
          //   modelo: res.data.modelo,
          //   idTipoAlm: res.data.producto.tipoAlmacen.nombre,
          //   precio: res.data.producto.precio,
          // })

          if (res.data.productosLoteSerial.length > 0) { //&& res.data.serial.length != 0 COMPLETAR ESTA LOGICA 
            this.isSerial = true
            console.log(this.detailGroup);

            const exisProducto = this.detailGroup.some(producto => {
              return producto.idProducto === this.formDetalleSalida.value.idProducto;
            });
            console.log(this.listadeProducto);

            if (this.listadeProducto.length == 0 && !exisProducto || this.listadeProducto[0].producto.descripcion != producto) {

              let detailSerialExist = this.detailGroup.filter(detalle => detalle.serial != null)

              if (this.listadeProducto.length > 0 && detailSerialExist.length > 0 && this.listadeProducto[0].producto.descripcion != producto) {
                this.productoList = this.productoList.filter(detalle => detalle.descripcion != this.listadeProducto[0].producto.descripcion)
              }
              this.listadeProducto = res.data.productosLoteSerial
            }

            this.formDetalleSalida.patchValue({
              existencia: this.listadeProducto[0].producto.stock,
              condicion: this.listadeProducto[0].condicion,
              marca: this.listadeProducto[0].marca,
              modelo: this.listadeProducto[0].modelo,
              idTipoAlm: this.listadeProducto[0].producto.tipoAlmacen.nombre,
              precio: this.listadeProducto[0].producto.precio,
              serial: this.listadeProducto[0].serial,
              cantidad: 1,
            })

            this.listadeProducto.shift()

            this.subTotalResult()

          } else {
            //let numberOfItems: number = 0
            this.isSerial = false

            // if(this.detailGroup.length > 0){
            //   this.detailGroup.map((detalle:any)=>{
            //     if(detalle.idProducto == producto){
            //       numberOfItems += detalle.cantidad
            //     }
            //   })
            // }

            this.formDetalleSalida.patchValue({
              existencia: res.data.productoLote.producto.stock,
              condicion: res.data.productoLote.condicion,
              marca: res.data.productoLote.marca,
              modelo: res.data.productoLote.modelo,
              idTipoAlm: res.data.productoLote.producto.tipoAlmacen.nombre,
              precio: res.data.productoLote.producto.precio,
            })
          }
          //else {

          //   this.isSerial = false

          //   this.formDetalleSalida.patchValue({
          //     existencia: res.data.producto.stock,
          //     condicion: res.data.condicion,
          //     marca: res.data.marca,
          //     idTipoAlm: res.data.producto.tipoAlmacen.nombre,
          //     modelo: res.data.modelo,
          //     serial: res.data.serial,
          //     precio: res.data.producto.precio,
          //   })
          // }
        }
      })
    this.subTotalResult()
  }

  sumaTotal() {
    this.resultSubTotal = 0
    this.cantidadItem = 0 

    this.detailGroup.map((detalle: any) => {
      this.resultSubTotal += detalle.subTotal
      this.cantidadItem += detalle.cantidad 

    })
  }

  sendData() {
    if (this.formSalida.valid && this.detailGroup.length > 0) {

      if (this.formDetalleSalida.valid) {
        alertUnableSend()
        return
      }

      if (this.formSalida.value.idRecinto.length > 0 && this.formSalida.value.idRecinto.length != null) {
        let recinto = this.recintoList.filter(item => item.nombre === this.formSalida.value.idRecinto)
        this.formSalida.value.idRecinto = recinto[0].idRecinto
        this.formSalida.value.idDepar = null
      } else {
        let idTipoDep = this.tipoDepartamentoList.filter(item => item.nombre === this.formSalida.value.idDepar)
        this.formSalida.value.idDepar = idTipoDep[0].idDepar
        this.formSalida.value.idRecinto = null
      }

      let idTipoSa = this.tipoSalidaList.filter(item => item.nombre === this.formSalida.value.idTipoSalida)
      this.formSalida.value.idTipoSalida = idTipoSa[0].idTipoSalida

      this.formSalida.value.total = this.resultSubTotal

      loading(true)

      this.api.postSalida(this.url, JSON.stringify(this.formSalida.value), this.token)
        .pipe(
          catchError((error) => {
            alertServerDown();
            return throwError(error);
          })
        )
        .subscribe((res: any) => {

          if (res.data !== null) {

            this.detailGroup.map((detail: detalleProductoSalida) => {

              let idTipoProD = this.idProductoList.filter(item => item.descripcion == detail.idProducto)
              detail.idSalida = res.data.idSalida
              detail.idProducto = idTipoProD[0].idProducto
            })

            this.api.postDetalleSalida(this.url, JSON.stringify(this.detailGroup), this.token)
              .pipe(
                catchError((error) => {
                  loading(false)
                  alertServerDown();

                  this.detailGroup = []
                  this.resultSubTotal = 0
                  this.formSalida.reset()
                  this.formDetalleSalida.reset()

                  return throwError(error);
                })
              )
              .subscribe((res: any) => {

                loading(false)

                if (res.success || res.data !== null) {

                  alertIsSuccess(true)

                  this.detailGroup = []
                  this.resultSubTotal = 0
                  this.getProducto()
                  this.getTipoSalida()
                  this.getTipoDepartamento()
                  this.getRecinto()
                }
                else {
                  alertIsSuccess(false)
                }
              })

            this.formDetalleSalida.reset()
            this.formSalida.reset()

          } else {
            alertIsSuccess(false)
          }
        })
    } else {
      alertNoValidForm()
    }
  }
}
