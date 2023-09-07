import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';
import { salidaService } from 'src/app/admin/Services/salida.service';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-reporte-salida-producto',
  templateUrl: './reporte-salida-producto.component.html',
  styleUrls: ['./reporte-salida-producto.component.css']
})
export class ReporteSalidaProductoComponent implements OnInit {
  
  dataFiltered: any[] = []
  filterRepSalida: FormGroup;
  url: string = ''
  noPage: number = 1
  token: string = ''
  pagina: number = 1
  loading: boolean = false;

  constructor(
    private api: salidaService,
    private store: Store<{ app: AppState }>
    ){
    this.filterRepSalida = new FormGroup({
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

      this.getSalida()
    })
  }

  getSalida() {

    this.loading = true

    this.api.getAllDetalleSalida(this.url, this.token, this.pagina, this.filterRepSalida.value.filter, '', '', )
      .subscribe((res: any) => {
        
        this.loading = false

        console.log(res)
        this.noPage = res.cantPage
        this.dataFiltered = res.data

        ,() => {
          this.loading = false
          alertServerDown();
        } 
      });
  }

  applyFilter() {
    if (this.filterRepSalida.value.filter.length >= 2) {
      console.log(this.filterRepSalida.value.filter)

      this.api.getAllDetalleSalida(this.url, this.token, this.filterRepSalida.value.filter, '', '',this.pagina)
      .subscribe((res: any)=> {
        this.noPage = res.cantPage
        this.dataFiltered = res.data

        ,() => {
          alertServerDown();
        }
      })

    } else {
      this.getSalida()
    }
  }

  nextPage(){
    if(this.pagina < this.noPage){
      this.pagina += 1
      this.getSalida()
    }
  }

  previousPage(){
    if(this.pagina > 1){
      this.pagina -= 1
      this.getSalida()
    }
  }
}
