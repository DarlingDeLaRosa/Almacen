import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { catchError, combineLatest } from 'rxjs';
import { alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';
import { salidaService } from 'src/app/admin/Services/salida.service';
import { AppState } from 'src/app/store/state';
import * as XLSX from 'xlsx';

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
    .pipe(
      catchError((error) => {
        this.loading = false
        alertServerDown();
        return error;
      })
    )    
    .subscribe((res: any) => {  
      console.log(res);
            
        this.loading = false
        this.noPage = res.cantPage
        this.dataFiltered = res.data
      });
  }

  applyFilter() {
    if (this.filterRepSalida.value.filter.length >= 2) {
      console.log(this.filterRepSalida.value.filter)

      this.api.getAllDetalleSalida(this.url, this.token, this.filterRepSalida.value.filter, '', '',this.pagina)
      .pipe(
        catchError((error) => {
          alertServerDown();
          return error;
        })
      )  
      .subscribe((res: any)=> {
        this.noPage = res.cantPage
        this.dataFiltered = res.data
      })

    } else {
      this.getSalida()
    }
  }

  exportExcel(){
    
    let data: any[] = []

    this.dataFiltered.map((detalles: any) => {
      data.push({
        Numero_de_Salida: detalles.salida.idSalida,
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
    XLSX.utils.book_append_sheet(wb, ws, 'Salida_Productos');

    XLSX.writeFile(wb, 'Reporte_Detalle_Salida.xlsx');
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
