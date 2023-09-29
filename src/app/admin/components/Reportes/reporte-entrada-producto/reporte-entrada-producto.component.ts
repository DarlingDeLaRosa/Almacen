import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { catchError, combineLatest, throwError } from 'rxjs';
import { alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';
import { entradaService } from 'src/app/admin/Services/entrada.service';
import { AppState } from 'src/app/store/state';
import * as XLSX from 'xlsx';


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
      .pipe(
        catchError((error) => {
          this.loading = false
          alertServerDown();
          return throwError(error);
        })
      )
      .subscribe((res: any) => {
        console.log(res);
        
        this.loading = false
        this.noPage = res.cantPage
        this.dataFiltered = res.data
      });
  }

  dataFilter() {
    if (this.filterRepEntrada.value.filter.length >= 2) {

      this.api.getAllDetalleEntrada(this.url, this.token, this.filterRepEntrada.value.filter, '', '', this.pagina)
        .pipe(
          catchError((error) => {
            alertServerDown();
            return throwError(error);
          })
        )
        .subscribe((res: any) => {
          this.noPage = res.cantPage
          this.dataFiltered = res.data
        })

    } else {
      this.getEntrada()
    }
  }

  exportExcel() {

    let data: any[] = []

    this.dataFiltered.map((detalles: any) => {
      data.push({
        Numero_de_Entrada: detalles.entrada.idEntrada,
        Producto: detalles.producto.nombre,
        Marca: detalles.marca,
        Modelo: detalles.modelo,
        Condición: detalles.condicion,
        Unidad_de_Medida: detalles.producto.unidadMe.descripcion,
        Serial: detalles.serial,
        Precio: detalles.precio,
        Cantidad: detalles.cantidad,
        SubTotal: detalles.subTotal
      })
    })

    data.reverse()

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Entrada_Productos');

    XLSX.writeFile(wb, 'Reporte_Detalle_Entrada.xlsx');
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
