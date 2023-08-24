import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { detalleProductoEntrada, producto, proveedor, tipoEntrada, tipoEntrega } from 'src/app/admin/models/interfaces';
import { alertIsSuccess, alertNoValidForm, alertRemoveSure, alertSerial, alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';
import { proveedorService } from 'src/app/admin/Services/proveedor.service';
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
  disableItbis: boolean = false
  idRol: number = 0

  detailGroup: detalleProductoEntrada[] = [];
  generalITBIS: boolean = false;
  serial: boolean = false;

  proveedorList: proveedor[] = []
  tipoEntradaList: tipoEntrada[] = []
  tipoEntregaList: tipoEntrega[] = []
  productoList: producto[] = []

  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    private apiProveedor: proveedorService,
    private apiTipoEntrega: TipoDeEntregaService,
    private apiTipoEntrada: TipoDeEntradaService,
    private apiProducto: productoService,
    private api: entradaService,
    private store: Store<{ app: AppState }>
  ) {
    this.formEntrada = this.fb.group({
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
      idEntrada: new FormControl(''),
      idTipoAlm: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
    this.store.select(state => state.app.user.role.idRol).subscribe((user: any) => { this.idRol = user; });

    this.getProveedor()
    this.getProducto()
    this.getTipoEntrada()
    this.getTipoEntrega()
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

  setValueDetailsEntrada(producto: any) {
    let setValuesform = this.productoList.filter((productoEspecifico: any) => {
      return productoEspecifico.nombre == producto
    });

    if(!this.generalITBIS){
      this.formDetalleEntrada.patchValue({
        idTipoAlm: setValuesform[0].tipoAlmacen.nombre
      })
    }else{
      this.formDetalleEntrada.patchValue({
        idTipoAlm: setValuesform[0].tipoAlmacen.nombre,
        itbisProducto: setValuesform[0].itbis
      })
    }
    
  }

  addDetail() {

    if (this.formDetalleEntrada.valid && this.formEntrada.valid) {
      console.log(this.serial)
      if (this.serial == false && this.formDetalleEntrada.value.cantidad == 1 || this.serial == true && this.formDetalleEntrada.value.cantidad !== 1 ) {

        this.totalResult += this.formDetalleEntrada.value.subTotal

        if (this.generalITBIS == false) {
          this.mostrarTotalItbis = 0
          this.totalItbis = this.formEntrada.value.itbisGeneral
          this.mostrarTotalItbis = this.totalItbis
        } else {
          this.mostrarTotalItbis += this.totalItbis
        }

        if (this.formEntrada.valid) {
          this.detailGroup.push(this.formDetalleEntrada.value)
          this.formDetalleEntrada.reset()
        }

        if (this.detailGroup.length >= 1) {
          this.disableItbis = true
        }
      } else {
        alertSerial()
      }
    } else {
      alertNoValidForm()
    }

  }

  editDetail(index: number, item: detalleProductoEntrada) {

    this.detailGroup.splice(index, 1)

    this.formDetalleEntrada.patchValue({
      idProducto: item.idProducto,
      cantidad: item.cantidad,
      condicion: item.condicion,
      marca: item.marca,
      modelo: item.modelo,
      precio: item.precio,
      serial: item.serial,
      itbisProducto: item.itbisProducto,
      subTotal: item.subTotal,
    })

    if ((this.generalITBIS == false && this.detailGroup.length == 0)) {
      this.totalItbis = 0
    }
    this.mostrarTotalItbis -= item.itbisProducto * item.cantidad
    this.totalResult -= item.subTotal

    if (this.detailGroup.length == 0) {
      this.disableItbis = false
    }
  }

  async removeDetail(index: number, item: detalleProductoEntrada) {

    let removeChoise: boolean = await alertRemoveSure()

    if (removeChoise) {
      this.detailGroup.splice(index, 1)

      if ((this.generalITBIS == false && this.detailGroup.length == 0)) {
        this.totalItbis = 0
      }
      this.mostrarTotalItbis -= item.itbisProducto * item.cantidad
      this.totalResult -= item.subTotal
    }

    if (this.detailGroup.length == 0) {
      this.disableItbis = false
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

    this.formEntrada.patchValue({
      itbisGeneralEstado: !this.generalITBIS,
      //itbisGeneral: this.mostrarTotalItbis
    })

    this.formEntrada.value.total = this.totalResult

    let idTipoEn = this.tipoEntradaList.filter(item => item.nombre === this.formEntrada.value.idTipoEntrada)
    this.formEntrada.value.idTipoEntrada = idTipoEn[0].idTipoEntrada

    let idTipoEnt = this.tipoEntregaList.filter(item => item.nombre === this.formEntrada.value.idTipoEntrega)
    this.formEntrada.value.idTipoEntrega = idTipoEnt[0].idTipoEntrega

    let idTipoPro = this.proveedorList.filter(item => item.razonSocial === this.formEntrada.value.idProveedor)
    this.formEntrada.value.idProveedor = idTipoPro[0].idProveedor

    if (this.formEntrada.valid && this.detailGroup.length >= 1) {

      console.log(this.formEntrada.value)

      this.api.postEntrada(this.url, this.formEntrada.value, this.token)
        .subscribe((res: any) => {


          if (res.success && res.data !== null) {

            this.detailGroup.map((detail: detalleProductoEntrada) => {
              detail.idEntrada = res.data.idEntrada
              let idTipoProD = this.productoList.filter(item => item.nombre === detail.idProducto)
              detail.idProducto = idTipoProD[0].idProducto
              if (detail.itbisProducto == "") {
                detail.itbisProducto = 0
              }
            })

            JSON.stringify(this.detailGroup)
            this.api.postDetalleEntrada(this.url, this.detailGroup, this.token)
              .subscribe((res: any) => {
                console.log(res)
                if (res.success) {
                  alertIsSuccess(true)
                  this.detailGroup = []
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
