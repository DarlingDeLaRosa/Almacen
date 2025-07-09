import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TipoDeEntradaService } from 'src/app/admin/Services/Configuracion/tipo-de-entrada.service';
import { TipoDeEntregaService } from 'src/app/admin/Services/Configuracion/tipo-de-entrega.service';
import { entradaService } from 'src/app/admin/Services/entrada.service';
import { productoService } from 'src/app/admin/Services/producto.service';
import { proveedorService } from 'src/app/admin/Services/proveedor.service';
import { detalleEditProductoEntrada, detalleProductoEntrada, detallePutGroup, producto, proveedor, tipoAlmacen, tipoEntrada, tipoEntrega } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';
import { ModalComponent } from '../../Modals/product-modal/modal.component';
import { alertBackMessage, alertIsSuccess, alertNoValidForm, alertRemoveSure, alertSameSerial, alertSerial, alertServerDown, alertUnableEdit, alertUnableSend, loading, noLessThanO, productNameNoExist } from 'src/app/admin/Helpers/alertsFunctions';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, combineLatest } from 'rxjs';

@Component({
  selector: 'app-edit-entradas',
  templateUrl: './edit-entradas.component.html',
  styleUrls: ['./edit-entradas.component.css']
})
export class EditEntradasComponent {

  formEditEntrada: FormGroup;
  formEditDetalleEntrada: FormGroup;
  url!: string;
  token!: string
  totalResult: number = 0
  //totalItbis: number = 0
  mostrarTotalItbis: number = 0
  disableItbis: boolean = false
  idRol: number = 0
  setdetailGroup: boolean = false
  id: number = 0
  recinto$ = this.store.select(state => state.app.user.recinto.nombre)

  detailGroup: detallePutGroup[] = [];
  generalITBIS!: boolean
  isSerial: boolean = false;
  cantidadItem: number = 0
  //serial: boolean = true;
  respuesta!: any

  proveedorList: proveedor[] = []
  tipoAlmacenList: tipoAlmacen[] = []
  tipoEntradaList: tipoEntrada[] = []
  tipoEntregaList: tipoEntrega[] = []
  productoList: producto[] = []
  //detalleList: detalleEditProductoEntrada[] = []

  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    private apiProveedor: proveedorService,
    private apiTipoEntrega: TipoDeEntregaService,
    private apiTipoEntrada: TipoDeEntradaService,
    private apiProducto: productoService,
    private router: Router,
    private api: entradaService,
    private store: Store<{ app: AppState }>,
    private route: ActivatedRoute
  ) {
    this.formEditEntrada = this.fb.group({
      fechaFactura: new FormControl('', Validators.required),
      idProveedor: new FormControl('', Validators.required),
      idTipoEntrada: new FormControl('', Validators.required),
      idTipoEntrega: new FormControl('', Validators.required),
      numOrden: new FormControl('', Validators.required),
      noFactura: new FormControl('', Validators.required),
      observacion: new FormControl(''),
      itbisGeneral: new FormControl(''),
      itbisGeneralEstado: new FormControl(''),
      total: new FormControl(''),
      idEntrada: 0,
    });

    this.formEditDetalleEntrada = this.fb.group({
      idProducto: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required),
      condicion: new FormControl('', Validators.required),
      marca: new FormControl('', Validators.required),
      modelo: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
      serial: new FormControl(''),
      observacion: new FormControl(''),
      subTotal: new FormControl(''),
      itbisProducto: new FormControl(''),
      idTipoAlm: new FormControl(''),
      idEntrada: 0,
      idEntradaDet: 0,
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
      this.store.select(state => state.app.user.role.idRol)
    ]).subscribe(([tokenValue, pathValue, idRole]) => {

      this.url = pathValue;
      this.token = tokenValue;
      this.idRol = idRole;

      this.getProducto()
      this.getProveedor()
      this.getTipoEntrada()
      this.getTipoEntrega()
    })
  }

  loadData() {
    loading(true)

    this.api.getEntradaById(this.url, this.token, this.id)
      .pipe(
        catchError((error) => {
          loading(false)
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        loading(false)

        this.respuesta = res.data.detalles
        if (res.data.isEditable != true && this.idRol != 1 && this.idRol != 2 ) {
          alertBackMessage('Los permisos para editar esta entrada aún no han sido confirmados.')
          this.router.navigate(['/almacen/administrar-entrada'])
        }
        
        if (res.success && res.data !== null) {

          //if (res.data.itbisGeneralEstado) {
          //this.generalITBIS = true
          //this.disableItbis = true
          this.generalITBIS = res.data.itbisGeneralEstado;

          this.formEditEntrada.patchValue({
            fechaFactura: res.data.fechaFactura,
            idProveedor: res.data.proveedor.razonSocial,
            idTipoEntrada: res.data.tipoEntrada.nombre,
            idTipoEntrega: res.data.tipoEntrega.nombre,
            numOrden: res.data.numOrden,
            noFactura: res.data.noFactura,
            observacion: res.data.observacion ? res.data.observacion : '',
            itbisGeneralEstado: res.data.itbisGeneralEstado,
            total: res.data.total,
            idEntrada: res.data.idEntrada
          })

          //this.detalleList = res.data.detalles

          //this.detalleList.map(detalle => {
          res.data.detalles.map((detalle: any) => {
            //this.setdetailGroup = true

            this.formEditDetalleEntrada.patchValue({
              idProducto: detalle.producto.descripcion,
              cantidad: detalle.cantidad,
              condicion: detalle.condicion,
              marca: detalle.marca,
              modelo: detalle.modelo,
              precio: detalle.precio,
              serial: detalle.serial,
              observacion: detalle.observacion ? detalle.observacion : '',
              subTotal: detalle.subTotal,
              //itbisProducto: detalle.itbisProducto,
              idTipoAlm: detalle.producto.tipoAlmacen.nombre,
              idEntrada: detalle.idEntrada,
              idEntradaDet: detalle.idEntradaDet,
            })

            if (this.generalITBIS) {
              this.formEditDetalleEntrada.patchValue({ itbisProducto: 18 })
            } else {
              this.formEditDetalleEntrada.patchValue({ itbisProducto: detalle.itbisProducto })
            }

            this.addDetail()
            //this.setdetailGroup = false
            this.formEditDetalleEntrada.reset()
          })


          //} 
          // else {

          //   this.generalITBIS = false
          //   this.disableItbis = true

          //   this.formEditEntrada.setValue({
          //     fechaFactura: res.data.fechaFactura,
          //     idProveedor: res.data.proveedor.razonSocial,
          //     idTipoEntrada: res.data.tipoEntrada.nombre,
          //     idTipoEntrega: res.data.tipoEntrega.nombre,
          //     numOrden: res.data.numOrden,
          //     noFactura: res.data.noFactura,
          //     observacion: res.data.observacion,
          //     itbisGeneral: res.data.itbisGeneral,
          //     itbisGeneralEstado: !res.data.itbisGeneralEstado,
          //     total: res.data.total,
          //     idEntrada: res.data.idEntrada
          //   })

          //   this.detalleList = res.data.detalles

          //   this.detalleList.map(detalle => {

          //     //this.setdetailGroup = true

          //     this.formEditDetalleEntrada.patchValue({
          //       idProducto: detalle.producto.nombre,
          //       cantidad: detalle.cantidad,
          //       condicion: detalle.condicion,
          //       marca: detalle.marca,
          //       modelo: detalle.modelo,
          //       precio: detalle.precio,
          //       serial: detalle.serial,
          //       observacion: detalle.observacion,
          //       subTotal: detalle.subTotal,
          //       itbisProducto: detalle.itbisProducto,
          //       idTipoAlm: detalle.producto.tipoAlmacen.nombre,
          //       idEntrada: detalle.idEntrada,
          //       idEntradaDet: detalle.idEntradaDet,
          //     })

          //     this.addDetail()
          //     //this.setdetailGroup = false
          //     this.formEditDetalleEntrada.reset()
          //   })
          // }
        }
      })
  }

  getProveedor() {
    this.apiProveedor.getProveedor(this.url, this.token, 1, 400)
      .subscribe((res: any) => {
        this.proveedorList = res.data
      });
  }

  getTipoEntrada() {
    this.apiTipoEntrada.getTipoEntrada(this.url, this.token, 1, 400)
      .subscribe((res: any) => {
        if (res !== null) {
          res.data.map((tentrada: any) => {
            if (tentrada.nombre != 'Donación' && tentrada.nombre != 'Prestamo') this.tipoEntradaList.push(tentrada)
          })
        }
      });
  }

  getTipoEntrega() {
    this.apiTipoEntrega.getTipoEntrega(this.url, this.token, 1, 400)
      .subscribe((res: any) => {
        if (res !== null) {
          res.data.map((tentrega: any) => {
            if (tentrega.nombre != 'Transferencia') this.tipoEntregaList.push(tentrega)
          })
        }
      });
  }

  getProducto() {
    this.apiProducto.getProducto(this.url, this.token, 1, 400)
      .pipe(
        catchError((error) => {
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        if (res.data != null) {
          this.loadData()
          this.productoList = res.data
        }
      });
  }

  findProveedorByName() {
    if (this.formEditEntrada.value.idProveedor.length >= 2) {

      this.apiProveedor.filterProveedor(this.url, this.token, 1, this.formEditEntrada.value.idProveedor)
        .subscribe((res: any) => {

          let options = res.data
          this.proveedorList = []

          options.forEach((detalle: any) => {
            this.proveedorList.push(detalle)
          });
        })
    } else {
      this.getProveedor()
    }
  }

  findTipoEntradaByName() {
    if (this.formEditEntrada.value.idTipoEntrada.length >= 2) {

      this.apiTipoEntrada.filterTipoEntrada(this.url, this.token, 1, this.formEditEntrada.value.idTipoEntrada)
        .subscribe((res: any) => {

          let options = res.data
          this.tipoEntradaList = []

          options.forEach((detalle: any) => {
            this.tipoEntradaList.push(detalle)
          });
        })
    } else {
      this.getTipoEntrada()
    }
  }

  findTipoEntregaByName() {
    if (this.formEditEntrada.value.idTipoEntrega.length >= 2) {

      this.apiTipoEntrega.filterTipoEntrega(this.url, this.token, 1, this.formEditEntrada.value.idTipoEntrega)
        .subscribe((res: any) => {

          let options = res.data
          this.tipoEntregaList = []

          options.forEach((detalle: any) => {
            this.tipoEntregaList.push(detalle)
          });
        })
    } else {
      this.getTipoEntrega()
    }
  }

  findProductoByName() {
    if (this.formEditDetalleEntrada.value.idProducto.length >= 2) {

      this.apiProducto.filterProducto(this.url, this.token, 1, this.formEditDetalleEntrada.value.idProducto)
        .subscribe((res: any) => {

          let options = res.data
          this.productoList = []

          options.forEach((detalle: any) => {
            this.productoList.push(detalle)
          });
        })
    } else {
      this.getProducto()
    }
  }

  openModal() {
    let dialogRef = this.dialog.open(ModalComponent)

    dialogRef.afterClosed().subscribe(() => {
      this.getProducto()
    })
  }

  itbisOption(event: any) {
    this.generalITBIS = event.value;

    this.formEditDetalleEntrada.get('itbisProducto')?.reset()
    this.setValueDetailsEntrada(this.formEditDetalleEntrada.value.idProducto)
  }

  serialOption(event: any) {
    this.isSerial = event.value

    if (this.isSerial == false) this.formEditDetalleEntrada.get('serial')?.reset()
  }


  setValueDetailsEntrada(producto: string) {

    let setValuesform = this.productoList.filter((productoEspecifico: producto) => {
      return productoEspecifico.descripcion == producto
    });

    if (this.generalITBIS) {

      this.formEditDetalleEntrada.patchValue({
        idTipoAlm: setValuesform[0].tipoAlmacen.nombre,
        precio: setValuesform[0].precio,
        itbisProducto: 18,
      })

    } else {

      this.formEditDetalleEntrada.patchValue({
        idTipoAlm: setValuesform[0].tipoAlmacen.nombre,
        precio: setValuesform[0].precio,
        itbisProducto: setValuesform[0].itbis,
      })

    }

    this.subTotalResult()
  }


  addDetail() {

    const exisProducto = this.productoList.some(producto => {
      return producto.descripcion === this.formEditDetalleEntrada.value.idProducto;
    });

    if (this.formEditDetalleEntrada.value.cantidad < 1) {
      noLessThanO()
      return
    }

    if (this.formEditDetalleEntrada.valid && this.formEditEntrada.valid) {
      if (exisProducto) {

        if (this.isSerial == true && this.formEditDetalleEntrada.value.cantidad == 1 || this.isSerial == false) {

          if (this.detailGroup.length > 0 && this.isSerial) {
            if (this.detailGroup.some(producto => {
              if (producto.serial && this.formEditDetalleEntrada.value.serial) {
                return producto.serial.toUpperCase() == this.formEditDetalleEntrada.value.serial.toUpperCase()
              }
              return false
            }
            )) {
              alertSameSerial()
              return
            }
          }

          //this.totalResult += this.formEditDetalleEntrada.value.subTotal

          // if (this.generalITBIS == false) {

          //   this.mostrarTotalItbis = 0
          //   this.totalItbis = this.formEditEntrada.value.itbisGeneral
          //   this.mostrarTotalItbis = this.totalItbis

          // } else {

          //   if (this.formEditDetalleEntrada.value.itbisProducto !== 0 && this.setdetailGroup == false) {

          //     this.subTotalResult()

          //     this.mostrarTotalItbis += this.totalItbis

          //     this.formEditDetalleEntrada.value.itbisProducto
          //       = this.formEditDetalleEntrada.value.itbisProducto * 0.01 * this.formEditDetalleEntrada.value.precio

          //   } else if (this.formEditDetalleEntrada.value.itbisProducto !== 0 && this.setdetailGroup == true) {

          //     this.totalItbis = this.formEditDetalleEntrada.value.itbisProducto * this.formEditDetalleEntrada.value.cantidad
          //     this.mostrarTotalItbis += this.totalItbis
          //   }

          // }

          if (this.generalITBIS) {

            this.formEditDetalleEntrada.value.itbisProducto = 0.18 * this.formEditDetalleEntrada.value.precio
            this.detailGroup.push(this.formEditDetalleEntrada.value)

          } else {

            this.formEditDetalleEntrada.value.itbisProducto = this.formEditDetalleEntrada.value.itbisProducto * 0.01 * this.formEditDetalleEntrada.value.precio
            this.detailGroup.push(this.formEditDetalleEntrada.value)

          }

          // this.detailGroup.push(this.formEditDetalleEntrada.value)
          this.sumaTotal()

          this.formEditDetalleEntrada.reset()

          if (this.detailGroup.length >= 1) this.disableItbis = true

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

  editDetail(index: number, detalle: detallePutGroup) {

    if (!this.formEditDetalleEntrada.valid) {

      let setValuesform = this.productoList.filter((productoEspecifico: producto) => {
        return productoEspecifico.descripcion == detalle.idProducto
      });

      this.detailGroup.splice(index, 1)

      //if (detalle.itbis == 0) {
      this.formEditDetalleEntrada.patchValue({
        idProducto: detalle.idProducto,
        cantidad: detalle.cantidad,
        condicion: detalle.condicion,
        marca: detalle.marca,
        modelo: detalle.modelo,
        precio: detalle.precio,
        serial: detalle.serial,
        //itbisProducto: setValuesform[0].itbis,
        subTotal: detalle.subTotal,
        idTipoAlm: detalle.idTipoAlm,
        observacion: detalle.observacion,
        idEntrada: detalle.idEntrada,
        idEntradaDet: detalle.idEntradaDet,
      })

      if (detalle.serial != null && detalle.serial.length > 0) {
        this.isSerial = true
        this.formEditDetalleEntrada.patchValue({ serial: detalle.serial })
      } else {
        this.isSerial = false
      }

      if (this.generalITBIS) this.formEditDetalleEntrada.patchValue({ itbisProducto: 18 })
      else this.formEditDetalleEntrada.patchValue({ itbisProducto: setValuesform[0].itbis })
      // } 
      //else {
      //   this.formEditDetalleEntrada.patchValue({
      //     idProducto: detalle.idProducto,
      //     cantidad: detalle.cantidad,
      //     condicion: detalle.condicion,
      //     marca: detalle.marca,
      //     modelo: detalle.modelo,
      //     precio: detalle.precio,
      //     serial: detalle.serial,
      //     itbis: detalle.itbis,
      //     subTotal: detalle.subTotal,
      //     idTipoAlm: detalle.tipoAlmacen.nombre,
      //     observacion: detalle.observacion
      //   })
      // }


      //this.mostrarTotalItbis -= detalle.itbisProducto * detalle.cantidad
      //this.totalResult -= detalle.subTotal

      if (this.detailGroup.length == 0) {
        //this.totalItbis = 0
        //this.totalResult = 0
        this.disableItbis = false
        //this.mostrarTotalItbis = 0
      }

    } else {
      alertUnableEdit()
    }
    this.sumaTotal()
  }

  async removeDetail(index: number, item: detalleProductoEntrada) {

    let removeChoise: boolean = await alertRemoveSure()

    if (removeChoise) {
      this.detailGroup.splice(index, 1)

      //if ((this.generalITBIS == false && this.detailGroup.length == 0)) {
      //  this.totalItbis = 0
      //}
      //this.mostrarTotalItbis -= item.itbisProducto * item.cantidad
      //this.totalResult -= item.subTotal
    }

    if (this.detailGroup.length == 0) {
      this.disableItbis = false
    }
    this.sumaTotal()
  }

  clearDetail() {
    this.formEditDetalleEntrada.reset()
  }

  duplicateDetail(producto: detallePutGroup) {

    if (!this.formEditDetalleEntrada.valid) {
      this.formEditDetalleEntrada.patchValue({
        idProducto: producto.idProducto,
        cantidad: producto.cantidad,
        condicion: producto.condicion,
        marca: producto.marca,
        modelo: producto.modelo,
        precio: producto.precio,
        serial: producto.serial,
        //itbisProducto: setValuesform[0].itbis,
        subTotal: producto.subTotal,
        idTipoAlm: producto.idTipoAlm,
        observacion: producto.observacion,
        idEntrada: producto.idEntrada,
        idEntradaDet: producto.idEntradaDet,
      })

      this.formEditDetalleEntrada.get('serial')?.reset()
      //this.setValueDetailEntradaEdit(producto.idProducto)

    } else {
      alertUnableEdit()
    }
    this.sumaTotal()
  }

  subTotalResult() {
    if (this.formEditDetalleEntrada.get('cantidad')?.valid || this.formEditDetalleEntrada.get('precio')?.valid) {

      let total = this.formEditDetalleEntrada.value.precio * this.formEditDetalleEntrada.value.cantidad
      this.formEditDetalleEntrada.patchValue({ subTotal: total })

    }

    //let form = this.formEditDetalleEntrada.value

    // if (this.formEditDetalleEntrada.get('cantidad')?.valid || this.formEditDetalleEntrada.get('precio')?.valid) {

    // if (this.formEditDetalleEntrada.value.itbisProducto >= 0.001) {

    // form.itbisProducto = form.itbisProducto * 0.01 * form.precio

    // this.totalItbis = form.cantidad * form.itbisProducto

    // let total = form.precio * form.cantidad

    // total += this.totalItbis

    // this.formEditDetalleEntrada.patchValue(
    // { subTotal: total }
    // )

    //   } else {
    //     let total = form.precio * form.cantidad
    //     this.formEditDetalleEntrada.patchValue({
    //       subTotal: total
    //     })
    //   }
    // }
  }

  sumaTotal() {

    this.totalResult = 0
    this.mostrarTotalItbis = 0
    this.cantidadItem = 0

    this.detailGroup.map((detalle: any) => {
      this.mostrarTotalItbis += detalle.itbisProducto * detalle.cantidad
      this.totalResult += detalle.subTotal
      this.cantidadItem += detalle.cantidad
    })

    this.totalResult += this.mostrarTotalItbis
  }


  editData() {

    if (this.formEditEntrada.valid && this.detailGroup.length >= 1) {

      if (this.formEditDetalleEntrada.valid) {
        alertUnableSend()
        return
      }

      this.formEditEntrada.value.itbisGeneralEstado = this.generalITBIS,
        this.formEditEntrada.value.itbisGeneral = this.mostrarTotalItbis
      this.formEditEntrada.value.total = this.totalResult

      let idTipoEn = this.tipoEntradaList.filter(tEntrada => tEntrada.nombre === this.formEditEntrada.value.idTipoEntrada)
      this.formEditEntrada.value.idTipoEntrada = idTipoEn[0].idTipoEntrada

      let idTipoEnt = this.tipoEntregaList.filter(tEntrega => tEntrega.nombre === this.formEditEntrada.value.idTipoEntrega)
      this.formEditEntrada.value.idTipoEntrega = idTipoEnt[0].idTipoEntrega

      let idTipoPro = this.proveedorList.filter(proveedor => proveedor.razonSocial === this.formEditEntrada.value.idProveedor)
      this.formEditEntrada.value.idProveedor = idTipoPro[0].idProveedor

      loading(true)

      this.api.putEntrada(this.url, this.formEditEntrada.value, this.token)
        .pipe(
          catchError((error) => {
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {

          if (res.data !== null) {

            this.detailGroup.map((detail: any) => {

              //let idsDetalles = this.respuesta.filter((detalle: any) => {
              //  if (detalle.idEntradaDet == detail.idEntradaDet && detalle.producto.nombre == detail.idProducto) {
              //    return detalle
              //  }
              //})

              let idTipoProD = this.productoList.filter(item => item.descripcion === detail.idProducto)

              detail.idProducto = idTipoProD[0].idProducto
              detail.idTipoAlm = idTipoProD[0].tipoAlmacen.idTipoAlm
              detail.idEntrada = res.data.idEntrada

              //if (idsDetalles.length == 0) {
              //  detail.idEntradaDet = null
              //}

              //if (detail.itbisProducto == "") {
              //  detail.itbisProducto = 0
              //}
            })

            this.api.postDetalleEntrada(this.url, this.detailGroup, this.token)
              .pipe(
                catchError((error) => {
                  loading(false)
                  alertServerDown();

                  this.detailGroup = []
                  this.mostrarTotalItbis = 0
                  this.totalResult = 0
                  this.disableItbis = false
                  this.formEditDetalleEntrada.reset()
                  this.formEditEntrada.reset()

                  return error;
                })
              )
              .subscribe((res: any) => {
                loading(false)

                if (res.data !== null) {

                  alertIsSuccess(true)

                  this.detailGroup = []
                  this.mostrarTotalItbis = 0
                  this.totalResult = 0
                  this.disableItbis = false

                  this.router.navigate(['/almacen/administrar-entrada'])

                } else {
                  alertIsSuccess(false)
                }
              })
            this.formEditDetalleEntrada.reset()
            this.formEditEntrada.reset()

          } else {
            alertIsSuccess(false)
          }
        })
    }
  }
}
