import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs';
import { alertBackMessage, alertIsSuccess, alertNoValidForm, alertProductCodeNoFound, alertServerDown, loading } from 'src/app/admin/Helpers/alertsFunctions';
import { TipoDeAlmacenService } from 'src/app/admin/Services/Configuracion/tipo-de-almacen.service';
import { TipoDeMedidaService } from 'src/app/admin/Services/Configuracion/tipo-de-medida.service';
import { TipoDeProductoService } from 'src/app/admin/Services/Configuracion/tipo-de-producto.service';
import { productoService } from 'src/app/admin/Services/producto.service';
import { GET, tipoAlmacen, tipoMedida, tipoProducto } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  formProducto: FormGroup;
  url!: string;
  token!: string
  rol!: number
  unidadMedidaList: tipoMedida[] = []
  tipoProductoList: tipoProducto[] = []
  tipoAlmacenList: tipoAlmacen[] = []
  recinto$ = this.store.select(state => state.app.user.recinto.nombre)

  constructor(
    public fb: FormBuilder,
    private apiTipoMedida: TipoDeMedidaService,
    private apiTipoProducto: TipoDeProductoService,
    private apiTipoAlmacen: TipoDeAlmacenService,
    private api: productoService,
    private store: Store<{ app: AppState }>
  ) {
    this.formProducto = this.fb.group({
      idCatalogo: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
      itbis: new FormControl('', Validators.required),
      stockMinimo: new FormControl('', Validators.required),
      idUnidadMe: new FormControl('', Validators.required),
      idTipoArt: new FormControl('', Validators.required),
      idTipoAlmacen: new FormControl('', Validators.required),
      auxiliar: new FormControl(''),
      denominacion: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
    this.store.select(state => state.app.user.role.idRol).subscribe((rol: number) => { this.rol = rol; });

    this.getTipoProducto();
    this.getUnidadMedida();
    this.getTipoAlmacen();

  }

  findByCodeProduct() {
    if (this.formProducto.value.idCatalogo.length >= 5) {

      this.api.findProductoByCode(this.url, this.token, this.formProducto.value.idCatalogo)
        .pipe(
          catchError((error) => {
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {
          if (res.data !== null) {
            this.formProducto.patchValue({
              idCatalogo: res.data.id,
              auxiliar: res.data.auxiliar.id,
              denominacion: res.data.auxiliar.denominacion,
              nombre: res.data.nombre
            })
          } else {
            alertProductCodeNoFound()
            this.formProducto.get('idCatalogo')?.reset()
            this.formProducto.get('auxiliar')?.reset()
            this.formProducto.get('denominacion')?.reset()
            this.formProducto.get('nombre')?.reset()
          }
        })
    }
  }

  getTipoAlmacen() {
    this.apiTipoAlmacen.getTipoAlmacen(this.url, this.token, 1, 200)
      .pipe(
        catchError((error) => {
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        this.tipoAlmacenList = res.data
      });
  }

  getUnidadMedida() {
    this.apiTipoMedida.getTipoMedida(this.url, this.token, 1, 200)
      .pipe(
        catchError((error) => {
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        if (res) {
          this.unidadMedidaList = res.data
        }
      })
  }

  getTipoProducto() {
    this.apiTipoProducto.getTipoProducto(this.url, this.token, 1, 200)
      .pipe(
        catchError((error) => {
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        if (res) {
          this.tipoProductoList = res.data
        }
      })
  }

  findTipoMedidaByName() {
    if (this.formProducto.value.idUnidadMe.length >= 2) {

      this.apiTipoMedida.filterTipoMedida(this.url, this.token, 1, this.formProducto.value.idUnidadMe)
        .pipe(
          catchError((error) => {
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {
          let options = res.data
          this.unidadMedidaList = []

          options.forEach((item: any) => {
            this.unidadMedidaList.push(item)
          });
        })
    } else {
      this.getUnidadMedida()
    }
  }

  findTipoProductoByName() {
    if (this.formProducto.value.idTipoArt.length >= 2) {

      this.apiTipoProducto.filterTipoProducto(this.url, this.token, 1, this.formProducto.value.idTipoArt)
        .pipe(
          catchError((error) => {
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {
          let options = res.data
          this.tipoProductoList = []

          options.forEach((item: any) => {
            this.tipoProductoList.push(item)
          });
        })
    } else {
      this.getTipoProducto()
    }
  }

  findTipoAlmacenByName() {
    if (this.formProducto.value.idTipoAlm.length >= 2) {

      this.apiTipoAlmacen.filterTipoAlmacen(this.url, this.token, 1, this.formProducto.value.idTipoAlm)
        .pipe(
          catchError((error) => {
            alertServerDown();
            return error;
          })
        )
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

  sendData() {
    if (this.formProducto.valid) {

      let idUnidadM = this.unidadMedidaList.filter(item => item.descripcion === this.formProducto.value.idUnidadMe)
      let idTipoP = this.tipoProductoList.filter(item => item.nombre === this.formProducto.value.idTipoArt)
      let idTipoAl = this.tipoAlmacenList.filter(item => item.nombre === this.formProducto.value.idTipoAlmacen)

      this.formProducto.value.idTipoAlmacen = idTipoAl[0].idTipoAlm
      this.formProducto.value.idUnidadMe = idUnidadM[0].idUnidadMe
      this.formProducto.value.idTipoArt = idTipoP[0].idTipoArt


      loading(true)

      this.api.postProducto(this.url, this.formProducto.value, this.token)
        .pipe(
          catchError((error) => {
            loading(false)
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {

          loading(false)
          if (res.data != null) { alertIsSuccess(true); this.formProducto.reset() }
          else { alertBackMessage(res.message) }
        })
    }else{
      alertNoValidForm()
    }
  }
}
