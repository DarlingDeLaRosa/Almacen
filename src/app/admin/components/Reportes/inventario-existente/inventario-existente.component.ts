import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { catchError, combineLatest } from 'rxjs';
import { alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';
import { productoService } from 'src/app/admin/Services/producto.service';
import { producto } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-inventario-existente',
  templateUrl: './inventario-existente.component.html',
  styleUrls: ['./inventario-existente.component.css']
})
export class InventarioExistenteComponent implements OnInit {

  dataFiltered: producto[] = []
  filterRepInventario: FormGroup;
  url: string = ''
  noPage: number = 1
  token: string = ''
  pagina: number = 1
  loading: boolean = false;

  constructor(
    private api: productoService,
    private store: Store<{ app: AppState }>
  ) {
    this.filterRepInventario = new FormGroup({
      filter: new FormControl(''),
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    })
  }

  ngOnInit(): void {
    combineLatest([
      this.store.select(state => state.app.token),
      this.store.select(state => state.app.path)
    ]).subscribe(([tokenValue, pathValue]) => {

      this.url = pathValue;
      this.token = tokenValue;

      this.getProducto()
    })
  }

  getProducto() {
    this.loading = true

    this.api.getProducto(this.url, this.token, this.pagina)
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

  dataFilter() {
    if (this.filterRepInventario.value.filter.length >= 3) {

      this.api.filterProducto(this.url, this.token, this.pagina, this.filterRepInventario.value.filter)
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

    } else {
      this.getProducto()
    }
  }

  nextPage() {
    if (this.pagina < this.noPage) {
      this.pagina += 1
      this.getProducto()
    }
  }

  previousPage() {
    if (this.pagina > 1) {
      this.pagina -= 1
      this.getProducto()
    }
  }
}
