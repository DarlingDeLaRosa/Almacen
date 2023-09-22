import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { catchError, combineLatest } from 'rxjs';
import { alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';
import { entradaService } from 'src/app/admin/Services/entrada.service';
import { productoService } from 'src/app/admin/Services/producto.service';
import { salidaService } from 'src/app/admin/Services/salida.service';
import { Entrada, producto, salida } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-vista-inicial',
  templateUrl: './vista-inicial.component.html',
  styleUrls: ['./vista-inicial.component.css']
})
export class VistaInicialComponent {

  itemEscasez: number = 0
  url: string = ''
  token: string = ''
  loading: boolean = false;
  dataFiltered: Entrada[] = [];
  dataFilteredS: salida[] = [];
  dataFilteredP: producto[] = []
  dataRecintoEscasez: any[] = []
  recintoActual: string = ''

  fechaActual = new Date()
  mesActual = this.fechaActual.getMonth() + 1
  diaActual = this.fechaActual.getDate()

  numEntradaMes: number = 0
  numEntradaDay: number = 0
  numSalidaMes: number = 0
  numSalidaDay: number = 0

  constructor(
    private api: productoService,
    private apiEntrada: entradaService,
    private apiSalida: salidaService,
    private store: Store<{ app: AppState }>
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.store.select(state => state.app.token),
      this.store.select(state => state.app.path),
      this.store.select(state => state.app.user.recinto.nombre),
    ]).subscribe(([tokenValue, pathValue, recinto]) => {

      this.url = pathValue;
      this.token = tokenValue;
      this.recintoActual = recinto

      this.getProductoAgotamineto()
      this.getEntrada()
      this.getSalida()
    })
  }

  getEntrada() {
    this.loading = true
    let lastFour = 0


    this.apiEntrada.getEntrada(this.url, this.token, 1, 200)
      .pipe(
        catchError((error) => {
          this.loading = false;
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        this.loading = false

        res.data.map((detalle: any) => {

          let fecha = detalle.fechaCreacion.split("-")
          let dia = fecha[2].split("T")

          if (this.mesActual == fecha[1]) this.numEntradaMes += 1
          if (this.diaActual == dia[0]) this.numEntradaDay += 1

          if (lastFour < 4) this.dataFiltered.push(detalle)
          lastFour += 1
        })
      });
  }

  getSalida() {
    this.loading = true
    let lastFour = 0


    this.apiSalida.getSalida(this.url, this.token, 1, 200)
      .pipe(
        catchError((error) => {
          this.loading = false
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        this.loading = false

        res.data.map((detalle: any) => {

          let fecha = detalle.fechaCreacion.split("-")
          let dia = fecha[2].split("T")

          if (this.mesActual == fecha[1]) this.numSalidaMes += 1
          if (this.diaActual == dia[0]) this.numSalidaDay += 1

          if (lastFour < 4) this.dataFilteredS.push(detalle)
          lastFour += 1
        })
      });
  }

  getProductoAgotamineto() {
    let lastFour = 0

    this.api.getProductoEscazes(this.url, this.token, 1)
      .pipe(
        catchError((error) => {
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        this.itemEscasez = res.data.length
        if (res.data != null) {
          console.log(res)
          this.getProductoAgotaminetoRecinto(res.data[0].idProducto)

          res.data.map((detalle: any) => {
            if (lastFour < 4) this.dataFilteredP.push(detalle)
            lastFour += 1
          })
        }

      });
  }

  getProductoAgotaminetoRecinto(producto: number) {
    console.log(producto);
    
    this.api.getProductoEscazesRecinto(this.url, this.token, producto)
      .pipe(
        catchError((error) => {
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        console.log(res)
        this.dataRecintoEscasez = []

        res.data.map((recintos: any) => {
          if (this.recintoActual != recintos.recinto.nombre) {
            this.dataRecintoEscasez.push(recintos)
          }
        })
      });
  }
}
