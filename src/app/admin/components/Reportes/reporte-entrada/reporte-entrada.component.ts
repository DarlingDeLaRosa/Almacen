import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { catchError, combineLatest } from 'rxjs';
import { alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';
import { entradaService } from 'src/app/admin/Services/entrada.service';
import { Entrada } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-reporte-entrada',
  templateUrl: './reporte-entrada.component.html',
  styleUrls: ['./reporte-entrada.component.css']
})
export class ReporteEntradaComponent implements OnInit {

  dataFiltered: Entrada[] = [];
  filterReporteEntrada: FormGroup;
  url: string = '';
  token: string = '';
  pagina: number = 1;
  noPage: number = 1;
  idRol: number = 0;
  loading: boolean = false;

  constructor(
    public dialog: MatDialog,
    private api: entradaService,
    private datePipe: DatePipe,
    private store: Store<{ app: AppState }>) {
    this.filterReporteEntrada = new FormGroup({
      nombre: new FormControl(''),
      desde: new FormControl(''),
      hasta: new FormControl(''),
    })
  }

  ngOnInit(): void {
    combineLatest([
      this.store.select(state => state.app.token),
      this.store.select(state => state.app.path),
      this.store.select(state => state.app.user.role.idRol),
    ]).subscribe(([tokenValue, pathValue, idRol]) => {

      this.url = pathValue;
      this.token = tokenValue;
      this.idRol = idRol

      this.getEntrada()
    })
  }

  getFormatteddesdeDate(): any {
    let desdeDate: Date = new Date(this.filterReporteEntrada.value.desde);
    let hastaDate = new Date(this.filterReporteEntrada.value.hasta);

    return {
      desde: this.datePipe.transform(desdeDate, 'yyyy/MM/dd'),
      hasta: this.datePipe.transform(hastaDate, 'yyyy/MM/dd')
    }
  }

  getEntrada() {
    this.loading = true
    this.api.getEntrada(this.url, this.token, this.pagina)
      .pipe(
        catchError((error) => {
          this.loading = false
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        this.loading = false
        this.noPage = res.cantPage
        this.dataFiltered = res.data
      });
  }

  onInputFilterChange() {
    if (this.filterReporteEntrada.value.nombre.length >= 2) {

      this.api.filterEntrada(this.url, this.token, this.pagina, this.filterReporteEntrada.value.nombre)
        .pipe(
          catchError((error) => {
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {
          this.noPage = res.cantPage
          this.dataFiltered = res.data
        })

      // if (this.filterReporteEntrada.get('desde') && this.filterReporteEntrada.get('hasta')) {

      //   let dates = this.getFormatteddesdeDate()
      //   console.log(dates)

      //   this.api.getEntradaReport(this.url, this.token, this.pagina, dates.desde, dates.hasta, this.filterReporteEntrada.value.nombre)
      //     .subscribe((res: any) => {
      //       console.log(res)
      //       this.noPage = res.cantPage
      //       this.dataFiltered = res.data
      //     })
      // }

    } else {
      this.getEntrada()
    }
  }

  nextPage() {
    if (this.pagina < this.noPage) {
      this.pagina += 1
      this.getEntrada()
    }
  }

  previousPage() {
    if (this.pagina > 1) {
      this.pagina -= 1
      this.getEntrada()
    }
  }
}
