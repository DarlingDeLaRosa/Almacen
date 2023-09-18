import { Component, OnInit, isDevMode } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { catchError, combineLatest, throwError } from 'rxjs';
import { alertCantExis, alertIsSuccess, alertNoValidForm, alertRemoveSure, alertSameSerial, alertSerial, alertServerDown, alertUnableEdit, loading } from 'src/app/admin/Helpers/alertsFunctions';
import { TipoDeAlmacenService } from 'src/app/admin/Services/Configuracion/tipo-de-almacen.service';
import { TipoDeSalidaService } from 'src/app/admin/Services/Configuracion/tipo-de-salida.service';
import { UserService } from 'src/app/admin/Services/Configuracion/usuarios.service';
import { productoService } from 'src/app/admin/Services/producto.service';
import { salidaService } from 'src/app/admin/Services/salida.service';
import { departamento, detalleProductoSalida, producto, recinto, tipoAlmacen, tipoSalida } from 'src/app/admin/models/interfaces';
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

  detailGroup: detalleProductoSalida[] = [];
  generalITBIS: boolean = true;
  serial: boolean = false;

  tipoSalidaList: tipoSalida[] = []
  tipoDepartamentoList: departamento[] = []
  productoList: producto[] = []
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
            if(recinto.nombre !== this.recintoActual) this.recintoList.push(recinto)
          })
        }
      })
  }

  getProducto() {
    this.productoList = []

    this.apiProducto.getProducto(this.url, this.token, 1)
      .pipe(
        catchError((error) => {
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        res.data.map((producto: any)=> {
          if(producto.stock !== 0) this.productoList.push(producto)
        })
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
            if(item.stock !== 0) this.productoList.push()
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

    if (this.formDetalleSalida.valid && this.formSalida.valid) {

      if (this.isSerial == false && this.formDetalleSalida.value.cantidad == 1 ||
        this.isSerial == false && this.formDetalleSalida.value.cantidad == 1 ||
        this.isSerial == true && this.formDetalleSalida.value.cantidad !== 1 ||
        this.isSerial == true && this.formDetalleSalida.value.cantidad == 1
      ) {

        if (this.detailGroup.length > 0 && this.isSerial == false) {
          if (this.detailGroup.some(producto => 
            { 
              if (producto.serial && this.formDetalleSalida.value.serial) {
                return producto.serial.toUpperCase() == this.formDetalleSalida.value.serial.toUpperCase() 
              }
              return false
            }
          )) {
            alertSameSerial()
            return
          }
        }

        if (this.formDetalleSalida.value.cantidad <= this.formDetalleSalida.value.existencia) {
          
          console.log(this.isSerial)
          if (this.isSerial == false && this.formDetalleSalida.value.cantidad == 1 || this.isSerial == true && this.formDetalleSalida.value.cantidad <= this.formDetalleSalida.value.existencia) {

            this.detailGroup.push(this.formDetalleSalida.value)
            this.resultSubTotal += this.formDetalleSalida.value.subTotal
            this.formDetalleSalida.reset()

          } 
        } else {
          alertCantExis()
        }
      } else {
        alertSerial()
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

      this.resultSubTotal -= item.subTotal
    } else {
      alertUnableEdit()
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

  setValueTransfer(producto: string) {
    if (producto === "Prestamo" || producto === 'Donación') {
      this.isTransferencia = true
    } else {
      this.isTransferencia = false
    }
  }

  setValueFormProductoSalida(producto: string) {
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
        console.log(res);
        
        if (res.data !== null) {
          if (res.data.serial == null || res.data.serial.length == 0) {
            
            this.isSerial = true

            this.formDetalleSalida.patchValue({
              existencia: res.data.producto.stock,
              condicion: res.data.condicion,
              marca: res.data.marca,
              modelo: res.data.modelo,
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
              serial: res.data.serial,
              precio: res.data.producto.precio,
            })
          }
        }
      })
  }

  sendData() {

    if (this.formSalida.value.idRecinto.length > 0) {
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

    if (this.formSalida.valid && this.detailGroup.length >= 1) {

      loading(true)
      console.log(JSON.stringify(this.formSalida.value))

      this.api.postSalida(this.url, JSON.stringify(this.formSalida.value), this.token)
        .pipe(
          catchError((error) => {
            alertServerDown();
            return throwError(error);
          })
        )
        .subscribe((res: any) => {
          console.log(res)
          if (res.success || res.data !== null) {

            this.detailGroup.map((detail: detalleProductoSalida) => {

              detail.idSalida = res.data.idSalida

              let idTipoProD = this.productoList.filter(item => item.nombre === detail.idProducto)

              detail.idProducto = idTipoProD[0].idProducto
            })
            console.log(this.detailGroup)
            this.api.postDetalleSalida(this.url, JSON.stringify(this.detailGroup), this.token)
              .pipe(
                catchError((error) => {
                  loading(false)
                  this.detailGroup = []
                  alertServerDown();
                  return throwError(error);
                })
              )
              .subscribe((res: any) => {
                console.log(res)
                loading(false)

                if (res.success) {
                  alertIsSuccess(true)
                  this.detailGroup = []
                  this.resultSubTotal = 0
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
    }
  }

}
