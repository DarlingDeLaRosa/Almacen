import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, combineLatest, throwError } from 'rxjs';
import { alertCantExis, alertIsSuccess, alertNoValidForm, alertNumItems, alertRemoveSure, alertSameSerial, alertSerial, alertServerDown, alertUnableEdit, alertUnableSend, loading, noLessThanO, productNameNoExist } from 'src/app/admin/Helpers/alertsFunctions';
import { TipoDeSalidaService } from 'src/app/admin/Services/Configuracion/tipo-de-salida.service';
import { UserService } from 'src/app/admin/Services/Configuracion/usuarios.service';
import { productoService } from 'src/app/admin/Services/producto.service';
import { salidaService } from 'src/app/admin/Services/salida.service';
import { departamento, detalleProductoSalida, producto, recinto, tipoAlmacen, tipoSalida } from 'src/app/admin/models/interfaces';
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
  isTransferencia: boolean = false
  idRol: number = 0
  resultSubTotal: number = 0
  recintoActual: string = ''
  respuesta: any
  listadeProducto: any[] = []
  idProductoList: any[] = []
  id: number = 0
  cantidadItem: number = 0

  detailGroup: detalleProductoSalida[] = [];
  generalITBIS: boolean = true;
  //serial: boolean = false;
  ediExis: number = 0

  tipoSalidaList: tipoSalida[] = []
  tipoAlmacenList: tipoAlmacen[] = []
  tipoDepartamentoList: departamento[] = []
  productoList: producto[] = []
  recintoList: recinto[] = []

  constructor(
    public dialog: MatDialog,
    private apiProducto: productoService,
    private apiRecinto: UserService,
    private apiTipoSalida: TipoDeSalidaService,
    private router: Router,
    private route: ActivatedRoute,
    private api: salidaService,
    public fb: FormBuilder,
    private store: Store<{ app: AppState }>
  ) {
    this.formEditSalida = this.fb.group({
      fechaCreacion: new FormControl('', Validators.required),
      idTipoSalida: new FormControl('', Validators.required),
      idDepar: new FormControl(''),
      observacion: new FormControl('', Validators.required),
      idRecinto: new FormControl(''),
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

    this.route.paramMap.subscribe(params => {
      const idparam = params.get('id');
      if (idparam !== null) this.id = parseInt(idparam)
    })

    combineLatest([
      this.store.select(state => state.app.token),
      this.store.select(state => state.app.path),
      this.store.select(state => state.app.user.role.idRol),
      this.store.select(state => state.app.user.recinto.nombre),
    ]).subscribe(([tokenValue, pathvalue, idRole, recintoNombre]) => {

      this.url = pathvalue;
      this.token = tokenValue;
      this.idRol = idRole;
      this.recintoActual = recintoNombre

      this.getProducto()
      this.getRecinto()
      this.getTipoSalida()
      this.getTipoDepartamento()

      this.loadData() //momentaneo
    })
  }

  loadData() {
    loading(true)

    this.api.getSalidaById(this.url, this.token, this.id)
      .pipe(
        catchError((error) => {
          loading(false)
          alertServerDown();
          return throwError(error);
        })
      )
      .subscribe((res: any) => {
        if (res.data != null) {

          loading(false)

          this.respuesta = res.data.detalles
          this.respuesta.map((detalle: any) => {
            this.idProductoList.filter((item: any) => {
              if (item.descripcion == detalle.producto.descripcion && this.productoList.filter(pitem => pitem.descripcion == item.descripcion).length == 0) this.productoList.push(item)
            });
          })

          if (res.success && res.data !== null) {

            this.formEditSalida.patchValue({
              fechaCreacion: res.data.fechaCreacion,
              idTipoSalida: res.data.tipoSalida.nombre,
              //idDepar: res.data.departamento.nombre,
              observacion: res.data.observacion,
              idSalida: res.data.idSalida
            })

            if (res.data.departamento != null) {

              this.isTransferencia = false
              this.formEditSalida.patchValue({
                idDepar: res.data.departamento.nombre
              })

            } else {

              this.isTransferencia = false
              this.formEditSalida.patchValue({
                idRecinto: res.data.recinto.nombre
              })

            }

            // this.isTransferencia = true

            // this.formEditSalida.patchValue({
            //   fechaCreacion: res.data.fechaCreacion,
            //   idTipoSalida: res.data.tipoSalida.nombre,
            //   //idRecinto: res.data.recinto.nombre,
            //   observacion: res.data.observacion,
            //   idSalida: res.data.idSalida
            // })


            //detalleList = res.data.detalles
            //detalleList.map(detalle => {
            res.data.detalles.map((detalle: any) => {

              this.formDetalleEditSalida.patchValue({
                idProducto: detalle.producto.descripcion,
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
        if (res.data != null) {
          this.idProductoList = res.data

          res.data.map((producto: any) => {
            if (producto.stock !== 0)
              this.productoList.push(producto)
          })
        }
      });
  }

  getRecinto() {
    this.recintoList = []

    this.apiRecinto.getRecinto(this.url, this.token)
      .pipe(
        catchError((error) => {
          alertServerDown();
          return throwError(error);
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

  getTipoSalida() {
    this.apiTipoSalida.getTipoSalida(this.url, this.token, 1, 400)
      .pipe(
        catchError((error) => {
          alertServerDown();
          return throwError(error);
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
          return throwError(error);
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
            if (item.stock !== 0) this.productoList.push(item)
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
            return throwError(error);
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
      return producto.descripcion === this.formDetalleEditSalida.value.idProducto;
    });

    if (this.formDetalleEditSalida.value.cantidad < 1) {
      noLessThanO()
      return
    }

    if (this.formDetalleEditSalida.valid && this.formEditSalida.valid) {
      if (exisProducto) {
        if (this.isSerial && this.formDetalleEditSalida.value.cantidad == 1 || this.isSerial == false) {

          if (this.detailGroup.length > 0 && this.isSerial) {
            if (this.detailGroup.some(producto => {
              if (producto.serial && this.formDetalleEditSalida.value.serial) {
                return producto.serial.toUpperCase() == this.formDetalleEditSalida.value.serial.toUpperCase()
              }
              return false
            }
            )) {
              alertSameSerial()
              return
            }
          }


          if (this.formDetalleEditSalida.value.idSalidaDet !== null) {
            let setValuesform = this.respuesta.filter((productoEspecifico: any) => {
              return productoEspecifico.producto.descripcion == this.formDetalleEditSalida.value.idProducto
            });

            this.ediExis = setValuesform[0].cantidad

          }

          if (
            this.formDetalleEditSalida.value.idSalidaDet != null && this.formDetalleEditSalida.value.cantidad <= this.formDetalleEditSalida.value.existencia + this.ediExis
            || this.formDetalleEditSalida.value.idSalidaDet == null && this.formDetalleEditSalida.value.cantidad <= this.formDetalleEditSalida.value.existencia
          ) {

            if (this.formDetalleEditSalida.value.idSalidaDet == null && !this.isSerial) {
              let cantidadTotal: number = 0
              let detailSerialNoExist = this.detailGroup.filter(detalle => detalle.serial == null && detalle.idProducto == this.formDetalleEditSalida.value.idProducto)

              if (detailSerialNoExist.length > 0) {

                detailSerialNoExist.map((detalle: any) => {
                  cantidadTotal += detalle.cantidad
                })


                if (cantidadTotal + this.formDetalleEditSalida.value.cantidad > this.formDetalleEditSalida.value.existencia) {
                  alertNumItems(this.formDetalleEditSalida.value.existencia - cantidadTotal)
                  if (this.formDetalleEditSalida.value.existencia - cantidadTotal == 0) this.formDetalleEditSalida.reset()
                  return
                }
              }
            }

            this.detailGroup.push(this.formDetalleEditSalida.value)
            //this.resultSubTotal += this.formDetalleEditSalida.value.subTotal

            if (this.formDetalleEditSalida.value.idSalidaDet == null && this.isSerial) {
              const exisProducts = this.detailGroup.some(producto => {
                return producto.idProducto === this.formDetalleEditSalida.value.idProducto;
              });

              if (exisProducts && this.listadeProducto.length == 0) { //|| !exisProducts && this.detailGroup.length > 0
                this.productoList = this.productoList.filter(detalle => detalle.descripcion != this.formDetalleEditSalida.value.idProducto)
              }
            }
            this.sumaTotal()
            this.formDetalleEditSalida.reset()

          } else {
            alertCantExis()
          }

          // if (this.isSerial == false && this.formDetalleEditSalida.value.cantidad == 1 || this.isSerial == true) {

          //   this.detailGroup.push(this.formDetalleEditSalida.value)
          //   //this.resultSubTotal += this.formDetalleEditSalida.value.subTotal
          //   this.formDetalleEditSalida.reset()
          // }
        }
        else {
          alertSerial()
        }
      } else {
        productNameNoExist()
      }
    } else {
      alertNoValidForm()
    }
  }

  clearDetail() {
    this.formDetalleEditSalida.reset()
  }

  editDetail(index: number, item: detalleProductoSalida) {

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

      if (item.serial != null && item.serial.length > 0) {
        this.isSerial = true
        this.formDetalleEditSalida.patchValue({ serial: item.serial })
      } else {
        this.isSerial = false
      }
      // this.resultSubTotal -= item.subTotal
    } else {
      alertUnableEdit()
    }

    if (item.idSalidaDet != null) {

      let setValuesform = this.respuesta.filter((productoEspecifico: any) => {
        return productoEspecifico.producto.descripcion == item.idProducto
      });

      this.ediExis = setValuesform[0].cantidad
    }

    this.sumaTotal()
  }

  subTotalResult() {
    this.formDetalleEditSalida.patchValue({
      subTotal: this.formDetalleEditSalida.value.cantidad * this.formDetalleEditSalida.value.precio
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

  setValueTransfer(producto: string) {
    if (producto === "Prestamo" || producto === 'Donación') {
      this.isTransferencia = true
    } else {
      this.isTransferencia = false
    }
  }

  setValueFormProductoSalida(producto: string) {

    // let setValuesform = this.productoList.filter((productoEspecifico: any) => {
    //   return productoEspecifico.nombre == producto
    // });

    // this.api.findProductoById(this.url, this.token, setValuesform[0].idProducto)
    //   .pipe(
    //     catchError((error) => {
    //       alertServerDown();
    //       return error;
    //     })
    //   )
    //   .subscribe((res: any) => {

    //     if (res.data !== null) {

    //       // if (res.data.serial.length > 0) {

    //       //   this.isSerial = false

    //       //   this.formDetalleEditSalida.patchValue({
    //       //     existencia: res.data.producto.stock,
    //       //     condicion: res.data.condicion,
    //       //     marca: res.data.marca,
    //       //     idTipoAlm: res.data.producto.tipoAlmacen.nombre,
    //       //     modelo: res.data.modelo,
    //       //     precio: res.data.producto.precio,
    //       //     serial: res.data.serial,
    //       //   })

    //       //} else {

    //       //this.isSerial = true

    //       this.formDetalleEditSalida.patchValue({
    //         existencia: res.data.producto.stock,
    //         condicion: res.data.condicion,
    //         marca: res.data.marca,
    //         idTipoAlm: res.data.producto.tipoAlmacen.nombre,
    //         modelo: res.data.modelo,
    //         precio: res.data.producto.precio,
    //       })

    //       if (res.data.serial != null && res.data.serial.length != 0) {
    //         this.isSerial = true
    //         this.formDetalleEditSalida.patchValue({
    //           serial: res.data.serial,
    //           cantidad: 1
    //         })
    //         this.subTotalResult()
    //       } else {
    //         this.isSerial = false
    //       }
    //       //}
    //     }
    //   })
    // this.subTotalResult()

    this.formDetalleEditSalida.reset()
    this.formDetalleEditSalida.patchValue({ idProducto: producto })

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

          // this.formDetalleEditSalida.patchValue({
          //   existencia: res.data.producto.stock,
          //   condicion: res.data.condicion,
          //   marca: res.data.marca,
          //   modelo: res.data.modelo,
          //   idTipoAlm: res.data.producto.tipoAlmacen.nombre,
          //   precio: res.data.producto.precio,
          // })

          if (res.data.productosLoteSerial.length > 0) { //&& res.data.serial.length != 0 COMPLETAR ESTA LOGICA 
            this.isSerial = true

            const exisProducto = this.detailGroup.some(producto => {
              return producto.idProducto === this.formDetalleEditSalida.value.idProducto;
            });

            if (this.listadeProducto.length == 0 && !exisProducto || this.listadeProducto[0].producto.descripcion != producto) {

              let detailSerialExist = this.detailGroup.filter(detalle => detalle.serial != null)

              if (this.listadeProducto.length > 0 && detailSerialExist.length > 0 && this.listadeProducto[0].producto.descripcion != producto) {
                this.productoList = this.productoList.filter(detalle => detalle.descripcion != this.listadeProducto[0].producto.descripcion)
              }
              this.listadeProducto = res.data.productosLoteSerial
            }

            this.formDetalleEditSalida.patchValue({
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

            this.formDetalleEditSalida.patchValue({
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

          //   this.formDetalleEditSalida.patchValue({
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

    if (this.formEditSalida.valid && this.detailGroup.length > 0) {

      if (this.formDetalleEditSalida.valid) {
        alertUnableSend()
        return
      }

      if (this.formEditSalida.value.idRecinto.length > 0 && this.formEditSalida.value.idRecinto.length != null) {
        let recinto = this.recintoList.filter(item => item.nombre === this.formEditSalida.value.idRecinto)
        this.formEditSalida.value.idRecinto = recinto[0].idRecinto
        this.formEditSalida.value.idDepar = null
      } else {
        let idTipoDep = this.tipoDepartamentoList.filter(item => item.nombre === this.formEditSalida.value.idDepar)
        this.formEditSalida.value.idDepar = idTipoDep[0].idDepar
        this.formEditSalida.value.idRecinto = null
      }

      let idTipoSa = this.tipoSalidaList.filter(item => item.nombre === this.formEditSalida.value.idTipoSalida)
      this.formEditSalida.value.idTipoSalida = idTipoSa[0].idTipoSalida

      this.formEditSalida.value.total = this.resultSubTotal


      loading(true)

      this.api.editSalida(this.url, this.formEditSalida.value, this.token)
        .pipe(
          catchError((error) => {
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {

          if (res.success || res.data !== null) {

            this.detailGroup.map((detail: any) => {

              //  let idsDetalles = this.respuesta.filter((detalle: any) => {
              //    if (detalle.idSalidaDet == detail.idSalidaDet && detalle.producto.nombre == detail.idProducto) {
              //      return detalle
              //    }
              //  })

              let idTipoProD = this.idProductoList.filter(item => item.descripcion === detail.idProducto)
              detail.idProducto = idTipoProD[0].idProducto
              detail.idTipoAlm = idTipoProD[0].tipoAlmacen.idTipoAlm
              detail.idSalida = res.data.idSalida

              // if (idsDetalles.length == 0) {
              //   detail.idSalidaDet = null
              // }
            })

            this.api.postDetalleSalida(this.url, JSON.stringify(this.detailGroup), this.token)
              .pipe(
                catchError((error) => {
                  loading(false)
                  alertServerDown();

                  this.detailGroup = []
                  this.resultSubTotal = 0
                  this.formEditSalida.reset()
                  this.formDetalleEditSalida.reset()
                  
                  return throwError(error);
                })
              )
              .subscribe((res: any) => {

                loading(false)

                if (res.success || res.data !== null) {

                  alertIsSuccess(true)

                  this.detailGroup = []
                  this.resultSubTotal = 0

                  this.router.navigate(['/almacen/administrar-salida'])
                }
                else {
                  alertIsSuccess(false)
                }
              })

            this.formEditSalida.reset()
            this.formDetalleEditSalida.reset()

          } else {
            alertIsSuccess(false)
          }
        })
    } else {
      alertNoValidForm()
    }
  }
}

