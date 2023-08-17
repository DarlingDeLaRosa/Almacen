import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { detalleProductoEntrada, producto, proveedor, tipoAlmacen, tipoEntrada, tipoEntrega } from 'src/app/admin/models/interfaces';
import { alertIsSuccess, alertRemoveSure, alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';
import { proveedorService } from 'src/app/admin/Services/proveedor.service';
import { TipoDeAlmacenService } from 'src/app/admin/Services/Configuracion/tipo-de-almacen.service';
import { TipoDeEntradaService } from 'src/app/admin/Services/Configuracion/tipo-de-entrada.service';
import { TipoDeEntregaService } from 'src/app/admin/Services/Configuracion/tipo-de-entrega.service';
import { ModalComponent } from '../../Modals/product-modal/modal.component';
import { productoService } from 'src/app/admin/Services/producto.service';
import { entradaService } from 'src/app/admin/Services/entrada.service';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css']
})
export class EntradasComponent implements OnInit {
  formEntrada: FormGroup;
  formDetalleEntrada: FormGroup;
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
    private store: Store<{ app: AppState }>
  ) {
    this.formEntrada = this.fb.group({
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

    this.formDetalleEntrada = this.fb.group({
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
    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });

    this.getProveedor()
    this.getProducto()
    this.getTipoAlmacen()
    this.getTipoEntrada()
    this.getTipoEntrega()
  }

  getTipoAlmacen() {
    this.apiTipoAlmacen.getTipoAlmacen(this.url, this.token, 1)
      .subscribe((res: any) => {
        console.log(res)
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
        console.log(this.productoList)

      });
  }

  findProveedorByName() {
    if (this.formEntrada.value.idProveedor.length >= 2) {

      this.apiProveedor.filterProveedor(this.url, this.token, 1, this.formEntrada.value.idProveedor)
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
    if (this.formEntrada.value.idTipoAlm.length >= 2) {

      this.apiTipoAlmacen.filterTipoAlmacen(this.url, this.token, 1, this.formEntrada.value.idTipoAlm)
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
    if (this.formEntrada.value.idTipoEntrada.length >= 2) {

      this.apiTipoEntrada.filterTipoEntrada(this.url, this.token, 1, this.formEntrada.value.idTipoEntrada)
        .subscribe((res: any) => {

          let options = res.data
          this.tipoEntradaList = []

          options.forEach((item: any) => {
            this.tipoEntradaList.push(item)
          });
        })
    } else {
      this.getTipoEntrada()
    }
  }

  findTipoEntregaByName() {
    if (this.formEntrada.value.idTipoEntrega.length >= 2) {

      this.apiTipoEntrega.filterTipoEntrega(this.url, this.token, 1, this.formEntrada.value.idTipoEntrega)
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
    if (this.formDetalleEntrada.value.idProducto.length >= 2) {

      this.apiProducto.filterProducto(this.url, this.token, 1, this.formDetalleEntrada.value.idProducto)
        .subscribe((res: any) => {

          let options = res.data
          this.productoList = []

          options.forEach((item: any) => {
            this.productoList.push(item)
          });

          console.log(this.productoList)
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
    console.log(this.productoList)
    console.log(this.formDetalleEntrada.value)

    if (this.formDetalleEntrada.valid) {

      this.totalResult += this.formDetalleEntrada.value.subTotal

      if (!this.generalITBIS) {
        this.mostrarTotalItbis = this.formEntrada.value.itbisGeneral
      } else {
        this.totalItbis += this.formDetalleEntrada.value.itbisProducto
        this.mostrarTotalItbis = this.totalItbis
        this.formEntrada.value.itbisGeneral = this.totalItbis
      }

      console.log(this.formEntrada.valid)

      if (this.formEntrada.valid) {
        console.log(this.formDetalleEntrada.value)
        this.detailGroup.push(this.formDetalleEntrada.value)
        this.formDetalleEntrada.reset()
      }

    }
  }

  editDetail(index: number, item: detalleProductoEntrada) {

    this.detailGroup.splice(index, 1)

    this.formDetalleEntrada.patchValue({
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
    let form = this.formDetalleEntrada.value

    if (this.formDetalleEntrada.get('cantidad')?.valid || this.formDetalleEntrada.get('precio')?.valid) {
      if (this.formDetalleEntrada.value.itbisProducto >= 0.01) {

        this.totalItbis = form.cantidad * form.itbisProducto
        let total = form.precio * form.cantidad
        total += this.totalItbis
        this.formDetalleEntrada.patchValue(
          { subTotal: total }
        )

      } else {

        let total = form.precio * form.cantidad
        this.formDetalleEntrada.patchValue({
          subTotal: total
        })
      }
    }
  }

  sendData() {

    console.log(this.detailGroup)
    console.log(this.mostrarTotalItbis)

    this.formEntrada.patchValue({
      itbisGeneralEstado: !this.generalITBIS,
      itbisGeneral: this.mostrarTotalItbis
    })

    this.formEntrada.value.total = this.totalResult

    let idTipoEn = this.tipoEntradaList.filter(item => item.nombre === this.formEntrada.value.idTipoEntrada)
    this.formEntrada.value.idTipoEntrada = idTipoEn[0].idTipoEntrada

    let idTipoAl = this.tipoAlmacenList.filter(item => item.nombre === this.formEntrada.value.idTipoAlm)
    this.formEntrada.value.idTipoAlm = idTipoAl[0].idTipoAlm

    let idTipoEnt = this.tipoEntregaList.filter(item => item.nombre === this.formEntrada.value.idTipoEntrega)
    this.formEntrada.value.idTipoEntrega = idTipoEnt[0].idTipoEntrega

    let idTipoPro = this.proveedorList.filter(item => item.razonSocial === this.formEntrada.value.idProveedor)
    this.formEntrada.value.idProveedor = idTipoPro[0].idProveedor

    if (this.formEntrada.valid && this.detailGroup.length >= 1) {

      console.log(this.formEntrada.value)

      this.api.postEntrada(this.url, this.formEntrada.value, this.token)
        .subscribe((res: any) => {

          console.log(res)

          if (res.success && res.data !== null) {

            this.detailGroup.map((detail: detalleProductoEntrada) => {
              detail.idEntrada = res.data.idEntrada
              let idTipoProD = this.productoList.filter(item => item.nombre === detail.idProducto)
              detail.idProducto = idTipoProD[0].idProducto
              if(detail.itbisProducto == ""){
                detail.itbisProducto = 0
              }
            })

            JSON.stringify(this.detailGroup)
            this.api.postDetalleEntrada(this.url, this.detailGroup, this.token)
              .subscribe((res: any) => {
                console.log(res)
                if (res.success) {
                  alertIsSuccess(true)
                }
                else {
                  alertIsSuccess(false)
                }
              })
            this.formDetalleEntrada.reset()
            this.formEntrada.reset()

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
