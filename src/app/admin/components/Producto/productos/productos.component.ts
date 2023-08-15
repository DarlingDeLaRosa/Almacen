import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { alertIsSuccess, alertProductCodeNoFound, alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';
import { TipoDeMedidaService } from 'src/app/admin/Services/Configuracion/tipo-de-medida.service';
import { TipoDeProductoService } from 'src/app/admin/Services/Configuracion/tipo-de-producto.service';
import { productoService } from 'src/app/admin/Services/producto.service';
import { GET, tipoMedida, tipoProducto } from 'src/app/admin/models/interfaces';
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
  unidadMedidaList: tipoMedida[] = []
  tipoProductoList: tipoProducto[] = []

  constructor(
    public fb: FormBuilder,
    private apiTipoMedida: TipoDeMedidaService,
    private apiTipoProducto: TipoDeProductoService,
    private api: productoService,
    private store: Store<{ app: AppState }>
  ) {
    this.formProducto = this.fb.group({
      idCatalogo: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
      stockMinimo: new FormControl('', Validators.required),
      idUnidadMe: new FormControl('', Validators.required),
      idTipoArt: new FormControl('', Validators.required),
      auxiliar: new FormControl(''),
      denominacion: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });

    this.getTipoProducto();
    this.getUnidadMedida();
  }

  findByCodeProduct() {
    if (this.formProducto.value.idCatalogo.length >= 5) {

      this.api.findProductoByCode(this.url, this.token, this.formProducto.value.idCatalogo)
        .subscribe((res: any) => {
          console.log(res)
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
          }

        })
    }
  }

  getUnidadMedida() {
    this.apiTipoMedida.getTipoMedida(this.url, this.token, 1)
      .subscribe((res: any) => {
        if (res) {
          this.unidadMedidaList = res.data
        }
      })
  }

  getTipoProducto() {
    this.apiTipoProducto.getTipoProducto(this.url, this.token, 1)
      .subscribe((res: any) => {
        if (res) {
          this.tipoProductoList = res.data
        }
      })
  }

  findTipoMedidaByName() {
    if (this.formProducto.value.idUnidadMe.length >= 2) {

      this.apiTipoMedida.filterTipoMedida(this.url, this.token, 1, this.formProducto.value.idUnidadMe)
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

  findTipoProductoByName(){
    if (this.formProducto.value.idTipoArt.length >= 2) {

      this.apiTipoProducto.filterTipoProducto(this.url, this.token, 1, this.formProducto.value.idTipoArt)
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


  sendData() {

    let idUnidadM = this.unidadMedidaList.filter(item => item.descripcion === this.formProducto.value.idUnidadMe)
    let idTipoP = this.tipoProductoList.filter(item => item.nombre === this.formProducto.value.idTipoArt)

    this.formProducto.value.idUnidadMe = idUnidadM[0].idUnidadMe
    this.formProducto.value.idTipoArt = idTipoP[0].idTipoArt

    if (this.formProducto.valid) {
      console.log(this.formProducto.value)
      this.api.postProducto(this.url, this.formProducto.value, this.token)
        .subscribe((res: any) => {

          if (res.success) {
            alertIsSuccess(true)
            this.formProducto.reset()
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
