import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { catchError, combineLatest } from 'rxjs';
import { alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';
import { salidaService } from 'src/app/admin/Services/salida.service';
import { salida } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-reporte-salida',
  templateUrl: './reporte-salida.component.html',
  styleUrls: ['./reporte-salida.component.css']
})
export class ReporteSalidaComponent {
  
  dataFiltered: salida[] = [];
  filterReporteSalida: FormGroup;
  url: string = '';
  token: string = '';
  pagina: number = 1;
  noPage: number = 1;
  idRol: number = 0;
  loading: boolean = false;

  constructor(
    public dialog: MatDialog,
    private api: salidaService,
    private store: Store<{ app: AppState }>) {
    this.filterReporteSalida = new FormGroup({
      filter: new FormControl(''),
      start: new FormControl(''),
      end: new FormControl(''),
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

      this.getSalida()
    })
  }

  getSalida() {
    this.loading = true

    this.api.getSalidaReport(this.url, this.token, this.pagina,10)
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
    if (this.filterReporteSalida.value.filter.length >= 2) {

      this.api.filterSalida(this.url, this.token, this.pagina, this.filterReporteSalida.value.filter)
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

    this.dataFiltered.map((detalles: any)=>{
      data.push({
        Fecha:  detalles.fechaCreacion,
        Fecha_Modificacion: detalles.fechaModif,
        Recinto: detalles.recinto.nombre,
        Tipo_de_Salida: detalles.tipoSalida.nombre,
        Departamento: detalles.departamento.nombre, 
        Creado_por: detalles.creadoPorU.nombre + detalles.creadoPorU.apellido,
        Monto_Total: detalles.total,
        Observacion: detalles.observacion,
      })
    })

    data.reverse()

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Salidas');

    XLSX.writeFile(wb, 'Reporte_Salidas.xlsx');
  }

  nextPage() {
    if (this.pagina < this.noPage) {
      this.pagina += 1
      this.getSalida()
    }
  }

  previousPage() {
    if (this.pagina > 1) {
      this.pagina -= 1
      this.getSalida()
    }
  }
}
