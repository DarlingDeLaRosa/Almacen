import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { proveedorService } from 'src/app/admin/Services/proveedor.service';
import { proveedor } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-reporte-proveedor',
  templateUrl: './reporte-proveedor.component.html',
  styleUrls: ['./reporte-proveedor.component.css']
})
export class ReporteProveedorComponent implements OnInit {

  dataFiltered: proveedor[] = []
  filterRepProveedor: FormGroup;
  url: string = ''
  noPage: number = 1
  token: string = ''
  pagina: number = 1

  constructor(
    private api: proveedorService,
    private store: Store<{ app: AppState }>
    ){
    this.filterRepProveedor = new FormGroup({
      filter: new FormControl(''),
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    })
  }
  
  ngOnInit() {
    combineLatest([
      this.store.select(state => state.app.token),
      this.store.select(state => state.app.path)
    ]).subscribe(([tokenValue, pathValue]) => {

      this.url = pathValue;
      this.token = tokenValue;

      this.getProveedor()
    })
  }

  getProveedor() {
    this.api.getProveedor(this.url, this.token, this.pagina,)
      .subscribe((res: any) => {
        console.log(res)
        this.noPage = res.cantPage
        this.dataFiltered = res.data
      });
  }

  dataFilter() {
    console.log(this.filterRepProveedor.value.filter)
    if (this.filterRepProveedor.value.filter.length >= 3) {

      this.api.filterProveedor(this.url, this.token, this.pagina, this.filterRepProveedor.value.filter)
      .subscribe((res: any)=> {
        this.noPage = res.cantPage
        this.dataFiltered = res.data
      })

    } else {
      this.getProveedor()
    }
  }

  nextPage(){
    if(this.pagina < this.noPage){
      this.pagina += 1
      this.getProveedor()
    }
  }

  previousPage(){
    if(this.pagina > 1){
      this.pagina -= 1
      this.getProveedor()
    }
  }
}
