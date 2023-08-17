import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TipoDeAlmacenService } from 'src/app/admin/Services/Configuracion/tipo-de-almacen.service';
import { TipoDeEntradaService } from 'src/app/admin/Services/Configuracion/tipo-de-entrada.service';
import { TipoDeEntregaService } from 'src/app/admin/Services/Configuracion/tipo-de-entrega.service';
import { entradaService } from 'src/app/admin/Services/entrada.service';
import { productoService } from 'src/app/admin/Services/producto.service';
import { proveedorService } from 'src/app/admin/Services/proveedor.service';
import { detalleProductoEntrada, producto, proveedor, tipoAlmacen, tipoEntrada, tipoEntrega } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';
import { ModalComponent } from '../../Modals/product-modal/modal.component';
import { alertRemoveSure } from 'src/app/admin/Helpers/alertsFunctions';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';

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

  detailGroup: detalleProductoEntrada[] = [];
  generalITBIS: boolean = false;
  serial: boolean = false;

  proveedorList: proveedor[] = []
  tipoAlmacenList: tipoAlmacen[] = []
  tipoEntradaList: tipoEntrada[] = []
  tipoEntregaList: tipoEntrega[] = []
  productoList: producto[] = []

  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    private apiProveedor: proveedorService,
    private apiTipoAlmacen: TipoDeAlmacenService,
    private apiTipoEntrega: TipoDeEntregaService,
    private apiTipoEntrada: TipoDeEntradaService,
    private apiProducto: productoService,
    private api: entradaService,
    private store: Store<{ app: AppState }>,
    private route: ActivatedRoute
  ) {
    this.formEditEntrada = this.fb.group({
      fechaFactura: new FormControl('', Validators.required),
      idProveedor: new FormControl('', Validators.required),
      idTipoAlm: new FormControl('', Validators.required),
      idTipoEntrada: new FormControl('', Validators.required),
      idTipoEntrega: new FormControl('', Validators.required),
      numOrden: new FormControl('', Validators.required),
      noFactura: new FormControl('', Validators.required),
      observacion: new FormControl('', Validators.required),
      itbisGeneral: new FormControl(''),
      itbisGeneralEstado: new FormControl(''),
      total: new FormControl(''),
    });

    this.formEditDetalleEntrada = this.fb.group({
      idProducto: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required),
      condicion: new FormControl('', Validators.required),
      marca: new FormControl('', Validators.required),
      modelo: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
      serial: new FormControl(''),
      subTotal: new FormControl(''),
      itbisProducto: new FormControl(''),
      idEntrada: new FormControl('')
    })
  }

  ngOnInit(): void {

    combineLatest([
      this.store.select(state => state.app.token),
      this.store.select(state => state.app.path)
    ]).subscribe(([tokenValue, pathValue]) => {
      this.url = pathValue;
      this.token = tokenValue;

      this.route.paramMap.subscribe(params => {
        const idparam = params.get('id');

        if (idparam !== null) {
          let id = parseInt(idparam)
          this.api.getEntradaById(this.url, this.token, id)
            .subscribe((res: any) => {

              if (res.success && res.data !== null) {
                this.formEditEntrada.setValue({
                  fechaFactura: res.data.fechaFactura,
                  idProveedor:  res.data.proveedor.idProveedor,
                  idTipoAlm: res.data.tipoAlm.nombre ,
                  idTipoEntrada:  res.data.tipoEntrada.idTipoEntrada,
                  idTipoEntrega: res.data.tipoEntrega.idTipoEntrega ,
                  numOrden:  res.data.numOrden,
                  noFactura: res.data.noFactura ,
                  observacion:  res.data.observacion,
                  itbisGeneral: res.data.itbisGeneral,
                  itbisGeneralEstado:  res.data.itbisGeneralEstado,
                  total:  res.data.total
                })

                this.detailGroup = res.data.detalles
              }
            })
        }
      })
      this.getProveedor()
      this.getProducto()
      this.getTipoAlmacen()
      this.getTipoEntrada()
      this.getTipoEntrega()
    })
  }

  getTipoAlmacen() {
    this.apiTipoAlmacen.getTipoAlmacen(this.url, this.token, 1)
      .subscribe((res: any) => {
        this.tipoAlmacenList = res.data
      });
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
        console.log(res.data)
        this.productoList = res.data
      });
  }


  findProveedorByName() {
    if (this.formEditEntrada.value.idProveedor.length >= 2) {

      this.apiProveedor.filterProveedor(this.url, this.token, 1, this.formEditEntrada.value.idProveedor)
        .subscribe((res: any) => {

          let options = res.data
          this.proveedorList = []

          options.forEach((item: any) => {
            this.proveedorList.push(item)
          });
        })
    } else {
      this.getProveedor()
    }
  }

  findTipoAlmacenByName() {
    if (this.formEditEntrada.value.idTipoAlm.length >= 2) {

      this.apiTipoAlmacen.filterTipoAlmacen(this.url, this.token, 1, this.formEditEntrada.value.idTipoAlm)
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

  findTipoEntradaByName() {
    if (this.formEditEntrada.value.idTipoEntrada.length >= 2) {

      this.apiTipoEntrada.filterTipoEntrada(this.url, this.token, 1, this.formEditEntrada.value.idTipoEntrada)
        .subscribe((res: any) => {

          let options = res.data
          this.tipoEntradaList = []

          options.forEach((item: any) => {
            this.tipoEntradaList.push(item)
          });
        })
    } else {
      this.getTipoAlmacen()
    }
  }

  findTipoEntregaByName() {
    if (this.formEditEntrada.value.idTipoEntrega.length >= 2) {

      this.apiTipoEntrega.filterTipoEntrega(this.url, this.token, 1, this.formEditEntrada.value.idTipoEntrega)
        .subscribe((res: any) => {

          let options = res.data
          this.tipoEntregaList = []

          options.forEach((item: any) => {
            this.tipoEntregaList.push(item)
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

          options.forEach((item: any) => {
            this.productoList.push(item)
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

  addDetail() {

    console.log(this.formEditDetalleEntrada.value)

    if (this.formEditDetalleEntrada.valid) {

      this.totalResult += this.formEditDetalleEntrada.value.subTotal

      if (!this.generalITBIS) {
        this.mostrarTotalItbis = this.formEditEntrada.value.itbisGeneral
      } else {
        this.totalItbis += this.formEditDetalleEntrada.value.itbisProducto
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

  editDetail(index: number, item: detalleProductoEntrada) {

    this.detailGroup.splice(index, 1)

    this.formEditDetalleEntrada.patchValue({
      idProducto: `${item.idProducto}`,
      cantidad: `${item.cantidad}`,
      condicion: `${item.condicion}`,
      marca: `${item.marca}`,
      modelo: `${item.modelo}`,
      precio: `${item.precio}`,
      serial: `${item.serial}`,
      itbisProducto: `${item.itbisProducto}`,
      subTotal: `${item.subTotal}`,
    })
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

    this.formEditEntrada.patchValue({
      itbisGeneralEstado: !this.generalITBIS
    })

    this.formEditEntrada.value.total = this.totalResult

    let idTipoEn = this.tipoEntradaList.filter(item => item.nombre === this.formEditEntrada.value.idTipoEntrada)
    this.formEditEntrada.value.idTipoEntrada = idTipoEn[0].idTipoEntrada

    let idTipoAl = this.tipoAlmacenList.filter(item => item.nombre === this.formEditEntrada.value.idTipoAlm)
    this.formEditEntrada.value.idTipoAlm = idTipoAl[0].idTipoAlm

    let idTipoEnt = this.tipoEntregaList.filter(item => item.nombre === this.formEditEntrada.value.idTipoEntrega)
    this.formEditEntrada.value.idTipoEntrega = idTipoEnt[0].idTipoEntrega

    let idTipoPro = this.proveedorList.filter(item => item.razonSocial === this.formEditEntrada.value.idProveedor)
    this.formEditEntrada.value.idProveedor = idTipoPro[0].idProveedor

    if (this.formEditEntrada.valid && this.detailGroup.length >= 1) {

      console.log(this.formEditEntrada.value)
      this.api.postEntrada(this.url, this.formEditEntrada.value, this.token)
        .subscribe((res: any) => {

          console.log(res)
          //if (res.success) {
          //  alertIsSuccess(true)
          //  //this.formTipoSalida.reset()
          //} else {
          //  alertIsSuccess(false)
          //}
          //() => {
          //  alertServerDown();
          //}
        })

    }
  }
}
