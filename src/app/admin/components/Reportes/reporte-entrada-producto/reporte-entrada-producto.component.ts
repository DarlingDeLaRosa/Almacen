import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';
import { entradaService } from 'src/app/admin/Services/entrada.service';
import { Entrada } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-reporte-entrada-producto',
  templateUrl: './reporte-entrada-producto.component.html',
  styleUrls: ['./reporte-entrada-producto.component.css']
})
export class ReporteEntradaProductoComponent implements OnInit {

  dataFiltered: any[] = []
  filterRepEntrada: FormGroup;
  url: string = ''
  noPage: number = 1
  token: string = ''
  pagina: number = 1
  loading: boolean = false;

  constructor(
    private api: entradaService,
    private store: Store<{ app: AppState }>
  ) {
    this.filterRepEntrada = new FormGroup({
      filter: new FormControl(''),
      // start: new FormControl<Date | null>(null),
      // end: new FormControl<Date | null>(null),
    })
  }

  ngOnInit() {
    combineLatest([
      this.store.select(state => state.app.token),
      this.store.select(state => state.app.path)
    ]).subscribe(([tokenValue, pathValue]) => {

      this.url = pathValue;
      this.token = tokenValue;

      this.getEntrada()
    })
  }

  getEntrada() {
    this.loading = true

    this.api.getAllDetalleEntrada(this.url, this.token, this.filterRepEntrada.value.filter, '', '', this.pagina)
      .subscribe((res: any) => {

        this.loading = false

        console.log(res)
        this.noPage = res.cantPage
        this.dataFiltered = res.data

          , () => {
            this.loading = false
            alertServerDown();
          }
      });
  }

  dataFilter() {
    if (this.filterRepEntrada.value.filter.length >= 2) {
      console.log(this.filterRepEntrada.value.filter)

      this.api.getAllDetalleEntrada(this.url, this.token, this.filterRepEntrada.value.filter, '', '', this.pagina)
        .subscribe((res: any) => {
          this.noPage = res.cantPage
          this.dataFiltered = res.data

          ,() => {
            alertServerDown();
          }  
        })

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
