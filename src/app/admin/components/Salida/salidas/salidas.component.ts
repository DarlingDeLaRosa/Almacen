import { Component, OnInit, isDevMode } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { alertCantExis, alertIsSuccess, alertNoValidForm, alertRemoveSure, alertSameSerial, alertSerial, alertServerDown, loading } from 'src/app/admin/Helpers/alertsFunctions';
import { TipoDeAlmacenService } from 'src/app/admin/Services/Configuracion/tipo-de-almacen.service';
import { TipoDeSalidaService } from 'src/app/admin/Services/Configuracion/tipo-de-salida.service';
import { productoService } from 'src/app/admin/Services/producto.service';
import { salidaService } from 'src/app/admin/Services/salida.service';
import { departamento, detalleProductoSalida, producto, tipoAlmacen, tipoSalida } from 'src/app/admin/models/interfaces';
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
  idRol: number = 0
  resultSubTotal: number = 0

  detailGroup: detalleProductoSalida[] = [];
  generalITBIS: boolean = true;
  serial: boolean = true;

  tipoSalidaList: tipoSalida[] = []
  tipoDepartamentoList: departamento[] = []
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
    this.formSalida = this.fb.group({
      fechaCreacion: new FormControl('', Validators.required),
      idTipoSalida: new FormControl('', Validators.required),
      idDepar: new FormControl('', Validators.required),
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
    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
    this.store.select(state => state.app.user.role.idRol).subscribe((user: any) => { this.idRol = user; });

    this.getProducto()
    this.getTipoSalida()
    this.getTipoDepartamento()
  }


  getProducto() {
    this.apiProducto.getProducto(this.url, this.token, 1)
      .subscribe((res: any) => {
        this.productoList = res.data
        console.log(this.productoList)

          , () => {
            alertServerDown();
          }
      });
  }

  getTipoSalida() {
    this.apiTipoSalida.getTipoSalida(this.url, this.token, 1)
      .subscribe((res: any) => {
        this.tipoSalidaList = res.data

          , () => {
            alertServerDown();
          }
      });
  }

  getTipoDepartamento() {
    this.api.getTipoDepartamento(this.url, this.token, 1)
      .subscribe((res: any) => {
        console.log(res)
        this.tipoDepartamentoList = res.data

          , () => {
            alertServerDown();
          }
      });
  }

  findProductoByName() {
    if (this.formDetalleSalida.value.idProducto.length >= 2) {

      this.apiProducto.filterProducto(this.url, this.token, 1, this.formDetalleSalida.value.idProducto)
        .subscribe((res: any) => {

          let options = res.data
          this.productoList = []

          options.forEach((item: any) => {
            this.productoList.push(item)
          });

          () => {
            alertServerDown();
          }
        })
    } else {
      this.getProducto()
    }
  }

  findTipoSalidaByName() {
    if (this.formSalida.value.idTipoSalida.length >= 2) {

      this.apiTipoSalida.filterTipoSalida(this.url, this.token, 1, this.formSalida.value.idTipoSalida)
        .subscribe((res: any) => {

          let options = res.data
          this.tipoSalidaList = []

          options.forEach((item: any) => {
            this.tipoSalidaList.push(item)
          });

          () => {
            alertServerDown();
          }
        })
    } else {
      this.getTipoSalida()
    }
  }

  findTipoDepartamentoByName() {
    if (this.formSalida.value.idDepar.length >= 2) {

      this.api.filterTipoDepartamento(this.url, this.token, 1, this.formSalida.value.idDepar)
        .subscribe((res: any) => {

          let options = res.data
          this.tipoDepartamentoList = []

          options.forEach((item: any) => {
            this.tipoDepartamentoList.push(item)
          });

          () => {
            alertServerDown();
          }
        })
    } else {
      this.getTipoDepartamento()
    }
  }

  addDetail() {

    if (this.formDetalleSalida.valid && this.formSalida.valid) {

      if (this.detailGroup.length >= 1 && this.serial == false) {
        if (this.detailGroup.some(producto => producto.serial.toUpperCase() == this.formDetalleSalida.value.serial.toUpperCase())) {
          alertSameSerial()
          return
        }
      }

      if (this.formDetalleSalida.value.cantidad <= this.formDetalleSalida.value.existencia) {

        if (this.isSerial == true && this.formDetalleSalida.value.cantidad == 1
          || this.isSerial == false) {

          this.detailGroup.push(this.formDetalleSalida.value)
          this.resultSubTotal += this.formDetalleSalida.value.subTotal
          this.formDetalleSalida.reset()

        } else {
          alertSerial()
        }

      } else {
        alertCantExis()
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
        idTipoAlm: item.idTipoAlmacen,
        subTotal: item.subTotal
      })

      this.resultSubTotal -= item.subTotal
    }

  }

  subTotalResult() {
    this.formDetalleSalida.patchValue({
      subTotal: this.formDetalleSalida.value.cantidad * this.formDetalleSalida.value.precio
    })
  }

  async removeDetail(index: number) {
    let removeChoise: boolean = await alertRemoveSure()

    if (removeChoise) {
      this.detailGroup.splice(index, 1)
    }
  }

  clearDetail() {
    this.formDetalleSalida.reset()
  }

  setValueFormProductoSalida(producto: any) {
    let setValuesform = this.productoList.filter((productoEspecifico: any) => {
      return productoEspecifico.nombre == producto
    });

    this.api.findProductoById(this.url, this.token, setValuesform[0].idProducto)
      .subscribe((res: any) => {

        console.log(res)
        if (res.data !== null) {
          if (res.data.serial !== "" && res.data.serial !== null) {
            this.isSerial = true

            this.formDetalleSalida.patchValue({
              existencia: res.data.producto.stock,
              condicion: res.data.condicion,
              marca: res.data.marca,
              modelo: res.data.modelo,
              serial: res.data.serial,
              idTipoAlm: res.data.producto.tipoAlmacen.nombre,
              precio: res.data.producto.precio,
            })
          } else {
            this.isSerial = false

            this.formDetalleSalida.patchValue({
              existencia: res.data.producto.stock,
              condicion: res.data.condicion,
              marca: res.data.marca,
              idTipoAlm: res.data.producto.tipoAlmacen.nombre,
              modelo: res.data.modelo,
              precio: res.data.producto.precio,
            })
          }
        }

        () => {
          alertServerDown();
        }
      })
  }

  sendData() {

    let idTipoSa = this.tipoSalidaList.filter(item => item.nombre === this.formSalida.value.idTipoSalida)
    this.formSalida.value.idTipoSalida = idTipoSa[0].idTipoSalida

    let idTipoDep = this.tipoDepartamentoList.filter(item => item.nombre === this.formSalida.value.idDepar)
    this.formSalida.value.idDepar = idTipoDep[0].idDepar

    this.formSalida.value.total = this.resultSubTotal

    if (this.formSalida.valid) {

      console.log(this.formSalida.value)
      loading(true)
      this.api.postSalida(this.url, this.formSalida.value, this.token)
        .subscribe((res: any) => {
          if (res.success) {

            this.detailGroup.map((detail: any) => {
              detail.idSalida = res.data.idSalida
              let idTipoProD = this.productoList.filter(item => item.nombre === detail.idProducto)
              detail.idProducto = idTipoProD[0].idProducto
            })

            JSON.stringify(this.detailGroup)

            console.log(this.detailGroup)

            this.api.postDetalleSalida(this.url, this.detailGroup, this.token)
              .subscribe((res: any) => {
                loading(false)

                if (res.data !== null) {

                  alertIsSuccess(true)

                  this.formSalida.reset()
                  this.detailGroup = []
                  this.resultSubTotal = 0
                }
                else {
                  alertIsSuccess(false)
                }
                () => {
                  loading(false)
                  alertServerDown();
                }
              })

          } else {
            alertIsSuccess(false)
          }
          () => {
            loading(false)
            alertServerDown();
          }
        })

    }
  }

}
