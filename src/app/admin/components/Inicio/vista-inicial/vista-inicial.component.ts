import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, combineLatest, throwError } from 'rxjs';
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
  pagina: number = 1;
  noPage: number = 1;
  dataFiltered: Entrada[] = [];
  dataFilteredS: salida[] = [];
  dataFilteredP: producto[] = []
  dataRecintoEscasez: any[] = []
  recintoActual: number = 0
  rol: number = 0

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
      this.store.select(state => state.app.user.recinto.idRecinto),
      this.store.select(state => state.app.user.role.idRol),
    ]).subscribe(([tokenValue, pathValue, recinto, rolActual]) => {

      this.url = pathValue;
      this.token = tokenValue;
      this.recintoActual = recinto
      this.rol = rolActual

      this.getProductoAgotamineto()
      this.getEntrada()
      this.getSalida()
    })
  }

  getEntrada() {
    this.loading = true
    let lastFour = 0


    this.apiEntrada.getEntrada(this.url, this.token, 1, 5, this.recintoActual)
      .pipe(
        catchError((error) => {
          this.loading = false;
          alertServerDown();
          return throwError(error);
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

    this.apiSalida.getSalida(this.url, this.token, 1, 5, this.recintoActual)
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
    this.api.getProductoEscazes(this.url, this.token, this.pagina, 4)
      .pipe(
        catchError((error) => {
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        this.noPage = res.cantPage
        
        if (res.data != null) {
          this.getProductoAgotaminetoRecinto(res.data[0].catalogo.id)
          this.itemEscasez = res.data.length
          this.dataFilteredP = res.data
        }
      });
  }

  getProductoAgotaminetoRecinto(producto: number) {
    
    this.api.getProductoEscazesRecinto(this.url, this.token, producto)
      .pipe(
        catchError((error) => {
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        this.dataRecintoEscasez = []
        
        res.data.map((recintos: any) => {
          if (this.recintoActual != recintos.recinto.nombre) {
            this.dataRecintoEscasez.push(recintos)
          }          
        })
      });
  }

  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }
  
  nextPage() {
    if (this.pagina < this.noPage) {
      this.pagina += 1
      this.getProductoAgotamineto()
    }
  }

  previousPage() {
    if (this.pagina > 1) {
      this.pagina -= 1
      this.getProductoAgotamineto()
    }
  }
}
