import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TipoDeEntradaService } from 'src/app/admin/Services/Configuracion/tipo-de-entrada.service';
import { TipoDeEntregaService } from 'src/app/admin/Services/Configuracion/tipo-de-entrega.service';
import { entradaService } from 'src/app/admin/Services/entrada.service';
import { productoService } from 'src/app/admin/Services/producto.service';
import { proveedorService } from 'src/app/admin/Services/proveedor.service';
import { detalleEditProductoEntrada, detallePutGroup, producto, proveedor, tipoAlmacen, tipoEntrada, tipoEntrega } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';
import { ModalComponent } from '../../Modals/product-modal/modal.component';
import { alertIsSuccess, alertRemoveSure, alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { TipoDeAlmacenService } from 'src/app/admin/Services/Configuracion/tipo-de-almacen.service';

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
  totalItbis: number = 0
  mostrarTotalItbis: number = 0
  idRol: number = 0

  detailGroup: detallePutGroup[] = [];
  generalITBIS!: boolean
  serial: boolean = true;
  respuesta!: string

  proveedorList: proveedor[] = []
  tipoAlmacenList: tipoAlmacen[] = []
  tipoEntradaList: tipoEntrada[] = []
  tipoEntregaList: tipoEntrega[] = []
  productoList: producto[] = []
  detalleList: detalleEditProductoEntrada[] = []

  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    private apiProveedor: proveedorService,
    private apiTipoEntrega: TipoDeEntregaService,
    private apiTipoEntrada: TipoDeEntradaService,
    private apiProducto: productoService,
    private apiTipoAlmacen: TipoDeAlmacenService,
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
      observacion: new FormControl('', Validators.required),
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

    let id: number = 0

    this.route.paramMap.subscribe(params => {
      const idparam = params.get('id');

      if (idparam !== null) {
        id = parseInt(idparam)
      }
    })

    combineLatest([
      this.store.select(state => state.app.token),
      this.store.select(state => state.app.path),
      this.store.select(state => state.app.user.role.idRol),
    ]).subscribe(([tokenValue, pathValue, idRole]) => {
      
      this.url = pathValue;
      this.token = tokenValue;
      this.idRol = idRole;

      this.api.getEntradaById(this.url, this.token, id)
        .subscribe((res: any) => {
          console.log(res.data)
          this.respuesta = res.itbisGeneralEstado

          if (res.success && res.data !== null) {

            if (res.data.itbisGeneralEstado == false) {
              this.generalITBIS = true

              this.formEditEntrada.patchValue({
                fechaFactura: res.data.fechaFactura,
                idProveedor: res.data.proveedor.razonSocial,
                idTipoEntrada: res.data.tipoEntrada.nombre,
                idTipoEntrega: res.data.tipoEntrega.nombre,
                numOrden: res.data.numOrden,
                noFactura: res.data.noFactura,
                observacion: res.data.observacion,
                itbisGeneralEstado: !res.data.itbisGeneralEstado,
                total: res.data.total,
                idEntrada: res.data.idEntrada
              })

              this.detalleList = res.data.detalles
              console.log(this.detalleList)
              this.detalleList.map(detalle => {
                this.detailGroup.push({

                  idProducto: detalle.producto.nombre,
                  idEntradaDet: detalle.idEntradaDet,
                  idEntrada: detalle.idEntrada,
                  marca: detalle.marca,
                  modelo: detalle.modelo,
                  condicion: detalle.condicion,
                  serial: detalle.serial,
                  precio: detalle.precio,
                  cantidad: detalle.cantidad,
                  itbisProducto: detalle.producto.itbis,
                  subTotal: detalle.subTotal,
                  observacion: detalle.observacion,
                  tipoAlmacen: detalle.producto.tipoAlmacen
                })
              })

             } 
            //else {

            //   this.generalITBIS = false

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

            //   this.detailGroup = res.data.detalles

            //   console.log(this.detailGroup)

            // }
          }
        })

      this.getProveedor()
      this.getProducto()
      this.getTipoEntrada()
      this.getTipoEntrega()
    })
  }

  getProveedor() {
    this.apiProveedor.getProveedor(this.url, this.token, 1)
      .subscribe((res: any) => {
        this.proveedorList = res.data
      });
  }

  getTipoEntrada() {
    this.apiTipoEntrada.getTipoEntrada(this.url, this.token, 1)
      .subscribe((res: any) => {
        this.tipoEntradaList = res.data
      });
  }

  getTipoEntrega() {
    this.apiTipoEntrega.getTipoEntrega(this.url, this.token, 1)
      .subscribe((res: any) => {
        this.tipoEntregaList = res.data
      });
  }

  getProducto() {
    this.apiProducto.getProducto(this.url, this.token, 1)
      .subscribe((res: any) => {
        this.productoList = res.data
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
  }

  serialOption(event: any) {
    this.serial = event.value
  }


  setValueDetailsEntrada(producto: string) {
    let setValuesform = this.productoList.filter((productoEspecifico: producto) => {
      return productoEspecifico.nombre == producto
    });
    if (!this.generalITBIS) {
      this.formEditDetalleEntrada.patchValue({
        idTipoAlm: setValuesform[0].tipoAlmacen.nombre,
        precio: setValuesform[0].precio
      })
    } else {
      this.formEditDetalleEntrada.patchValue({
        idTipoAlm: setValuesform[0].tipoAlmacen.nombre,
        itbisProducto: setValuesform[0].itbis,
        precio: setValuesform[0].precio
      })
    }
  }

  addDetail() {

    console.log(this.formEditDetalleEntrada.value)

    if (this.formEditDetalleEntrada.valid) {

      this.totalResult += this.formEditDetalleEntrada.value.subTotal

      if (!this.generalITBIS) {
        this.mostrarTotalItbis = this.formEditEntrada.value.itbisGeneral
      } else {
        this.totalItbis += this.formEditDetalleEntrada.value.itbis
        this.mostrarTotalItbis = this.totalItbis
        this.formEditEntrada.value.itbisGeneral = this.totalItbis
      }

      console.log(this.formEditEntrada.valid)

      if (this.formEditEntrada.valid) {
        console.log(this.formEditDetalleEntrada.value)
        this.detailGroup.push(this.formEditDetalleEntrada.value)
        this.formEditDetalleEntrada.reset()
      }
    }
  }

  editDetail(index: number, detalle: detallePutGroup) {
    console.log(detalle)
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
        itbisProducto: detalle.itbisProducto,
        subTotal: detalle.subTotal,
        idTipoAlm: detalle.tipoAlmacen.nombre,
        observacion: detalle.observacion,
        idEntrada: detalle.idEntrada,
        idEntradaDet: detalle.idEntradaDet,
      })
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

    console.log(this.formEditDetalleEntrada.value)
  }

  async removeDetail(index: number) {

    let removeChoise: boolean = await alertRemoveSure()

    if (removeChoise) {
      this.detailGroup.splice(index, 1)
    }
  }

  subTotalResult() {
    let form = this.formEditDetalleEntrada.value

    if (this.formEditDetalleEntrada.get('cantidad')?.valid || this.formEditDetalleEntrada.get('precio')?.valid) {
      if (this.formEditDetalleEntrada.value.itbisProducto >= 0.01) {

        this.totalItbis = form.cantidad * form.itbisProducto
        let total = form.precio * form.cantidad
        total += this.totalItbis
        this.formEditDetalleEntrada.patchValue(
          { subTotal: total }
        )

      } else {

        let total = form.precio * form.cantidad
        this.formEditDetalleEntrada.patchValue({
          subTotal: total
        })
      }
    }
  }

  editData() {

    console.log(this.detailGroup)
    this.formEditEntrada.value.itbisGeneralEstado = !this.generalITBIS,
    this.formEditEntrada.value.itbisGeneral = this.mostrarTotalItbis


    this.formEditEntrada.value.total = this.totalResult

    let idTipoEn = this.tipoEntradaList.filter(tEntrada => tEntrada.nombre === this.formEditEntrada.value.idTipoEntrada)
    this.formEditEntrada.value.idTipoEntrada = idTipoEn[0].idTipoEntrada

    let idTipoEnt = this.tipoEntregaList.filter(tEntrega => tEntrega.nombre === this.formEditEntrada.value.idTipoEntrega)
    this.formEditEntrada.value.idTipoEntrega = idTipoEnt[0].idTipoEntrega

    let idTipoPro = this.proveedorList.filter(proveedor => proveedor.razonSocial === this.formEditEntrada.value.idProveedor)
    this.formEditEntrada.value.idProveedor = idTipoPro[0].idProveedor

    if (this.formEditEntrada.valid && this.detailGroup.length >= 1) {

      console.log(this.formEditEntrada.value)
      this.api.putEntrada(this.url, this.formEditEntrada.value, this.token)
        .subscribe((res: any) => {

          console.log(res)
          if (res.data !== null) {
            
            this.detailGroup.map((detail: any) => {
              console.log(detail)

              let idTipoProD = this.productoList.filter(item => item.nombre === detail.idProducto)
              
              detail.idProducto = idTipoProD[0].idProducto
              detail.idTipoAlm = idTipoProD[0].tipoAlmacen.idTipoAlm

              if (detail.itbisProducto == "") {
                detail.itbisProducto = 0
              }
            })

            console.log(JSON.stringify(this.detailGroup))
            


            this.api.postDetalleEntrada(this.url, this.detailGroup, this.token)
            .subscribe((respuesta: any)=>{
              console.log(respuesta)
              if(respuesta.success){
                alertIsSuccess(true)
              }else{
                alertIsSuccess(false)
              }
            })

          } else {
            alertIsSuccess(false)
          }
          () => {
            alertServerDown();
          }
        })

    }
  }
}
