import { Component, OnInit, isDevMode } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { alertRemoveSure } from 'src/app/admin/Helpers/alertsFunctions';
import { TipoDeAlmacenService } from 'src/app/admin/Services/Configuracion/tipo-de-almacen.service';
import { TipoDeSalidaService } from 'src/app/admin/Services/Configuracion/tipo-de-salida.service';
import { productoService } from 'src/app/admin/Services/producto.service';
import { salidaService } from 'src/app/admin/Services/salida.service';
import { detalleProductoSalida, producto, tipoAlmacen, tipoSalida } from 'src/app/admin/models/interfaces';
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
  isSerial:boolean = false
  idRol: number = 0

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
    private apiTipoAlmacen: TipoDeAlmacenService,
    private apiTipoSalida: TipoDeSalidaService,
    private api: salidaService,
    public fb: FormBuilder,
    private store: Store<{ app: AppState }>
  ) {
    this.formSalida = this.fb.group({
      fechaCreacion: new FormControl('', Validators.required),
      idTipoSalida: new FormControl('', Validators.required),
      idTipoAlm: new FormControl('', Validators.required),
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
      serial: new FormControl(''),
      precio: new FormControl(''),
      subTotal: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
    this.store.select(state => state.app.user.role.idRol).subscribe((user: any) => { this.idRol = user; });

    this.getProducto()
    this.getTipoAlmacen()
    this.getTipoSalida()
    this.getTipoDepartamento()
  }

  getTipoAlmacen() {
    this.apiTipoAlmacen.getTipoAlmacen(this.url, this.token, 1)
      .subscribe((res: any) => {
        console.log(res)
        this.tipoAlmacenList = res.data
      });
  }

  getProducto() {
    this.apiProducto.getProducto(this.url, this.token, 1)
      .subscribe((res: any) => {
        this.productoList = res.data
      });
  }

  getTipoSalida() {
    this.apiTipoSalida.getTipoSalida(this.url, this.token, 1)
      .subscribe((res: any) => {
        this.tipoSalidaList = res.data
      });
  }

  getTipoDepartamento() {
    this.api.getTipoDepartamento(this.url, this.token, 1)
      .subscribe((res: any) => {
        console.log(res)
        this.tipoDepartamentoList = res.data
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

          console.log(this.productoList)
        })
    } else {
      this.getProducto()
    }
  }

  findTipoAlmacenByName() {
    if (this.formSalida.value.idTipoAlm.length >= 2) {

      this.apiTipoAlmacen.filterTipoAlmacen(this.url, this.token, 1, this.formSalida.value.idTipoAlm)
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

  findTipoSalidaByName() {
    if (this.formSalida.value.idTipoSalida.length >= 2) {

      this.apiTipoSalida.filterTipoSalida(this.url, this.token, 1, this.formSalida.value.idTipoSalida)
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
    if (this.formDetalleSalida.valid) {

      if (this.formSalida.valid) {
        console.log(this.formDetalleSalida.value)
        this.detailGroup.push(this.formDetalleSalida.value)
        this.formDetalleSalida.reset()
      }
    }
  }

  editDetail(index: number, item: detalleProductoSalida) {

    this.detailGroup.splice(index, 1)

    this.formDetalleSalida.setValue({
      producto: `${item.idProducto}`,
      cantidad: `${item.cantidad}`,
      condicion: `${item.condicion}`,
      marca: `${item.marca}`,
      modelo: `${item.modelo}`,
      precio: `${item.precio}`,
      noSerial: `${item.serial}`,
      existencia: `${item.existencia}`,
    })
  }

  async removeDetail(index: number) {

    let removeChoise: boolean = await alertRemoveSure()

    if (removeChoise) {
      this.detailGroup.splice(index, 1)
    }
  }

  setValueFormProductoSalida(producto: any) {
    console.log(producto)
    let setValuesform = this.productoList.filter((productoEspecifico: any) => {
      return productoEspecifico.nombre == producto
    });

    this.api.findProductoById(this.url, this.token, setValuesform[0].idProducto)
      .subscribe((res: any) => {
        if (res.data !== null) {
          if(res.data.producto.serial !== null){
            this.isSerial = true
            this.formDetalleSalida.patchValue({
              existencia: new FormControl('', Validators.required),
              condicion: new FormControl('', Validators.required),
              marca: new FormControl('', Validators.required),
              modelo: new FormControl('', Validators.required),
              serial: new FormControl(''),
              precio: new FormControl(''),
            })
          }else{
            this.isSerial = false
            this.formDetalleSalida.patchValue({
              existencia: new FormControl('', Validators.required),
              condicion: new FormControl('', Validators.required),
              marca: new FormControl('', Validators.required),
              modelo: new FormControl('', Validators.required),
              precio: new FormControl(''),
            })
          }
        }

      })
  }

  sendData() {

    if (this.formSalida.valid) {

      //this.api.postTipoSalida(this.url, this.formTipoSalida.value, this.token)
      //  .subscribe((res: any) => {
      //
      //    dataTipoSalida = res
      //
      //    if (dataTipoSalida.success) {
      //      alertIsSuccess(true)
      //      this.formTipoSalida.reset()
      //    } else {
      //      alertIsSuccess(false)
      //    }
      //    ()=> {
      //      alertServerDown();
      //    }})

    }
  }

}
