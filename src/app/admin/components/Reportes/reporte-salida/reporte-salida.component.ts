import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { entradaService } from 'src/app/admin/Services/entrada.service';
import { Entrada } from 'src/app/admin/models/interfaces';

@Component({
  selector: 'app-reporte-salida',
  templateUrl: './reporte-salida.component.html',
  styleUrls: ['./reporte-salida.component.css']
})
export class ReporteSalidaComponent {
  filterReporteEntrada!: FormGroup;

  dataFiltered!: Entrada[];
  url: string = '';
  token: string = '';
  pagina: number = 1;
  noPage: number = 1;
  idRol: number = 0;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  dates(){
    console.log(this.range)
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['fechaFactura', 'idProveedor', 'idRecinto', 'idTipoAlm', 'idTipoEntrada', 'idTipoEntrega', 'numOrden', 'observacion', 'total',];
  data = new MatTableDataSource(

    [
      {
        fechaFactura: 'Azucar', idProveedor: 'azucar blanca', idRecinto: 'Lider', idTipoAlm: 'Sacarosa',
        idTipoEntrada: '100010023', idTipoEntrega: 'Nuevo', numOrden: 2000, observacion: 'Esta muy bien', total: 78
      },

    ]
  ) ;

  onInputFilterChange() {
    if (this.filterReporteEntrada.value.filter.length >= 2) {

      this.api.filterEntrada(this.url, this.token, this.pagina, this.filterReporteEntrada.value.filter)
      .subscribe((res: any)=> {
        this.noPage = res.cantPage
        this.dataFiltered = res.data
      })

    } else {
      this.getEntrada()
    }
  }

  
  getEntrada() {
    this.api.getEntrada(this.url, this.token, this.pagina)
      .subscribe((res: any) => {
        console.log(res)
        this.noPage = res.cantPage
        this.dataFiltered = res.data
      });
  }

  constructor(private _liveAnnouncer: LiveAnnouncer, 
    private api: entradaService,
    ) { }

  ngAfterViewInit(): void {
    this.data.sort = this.sort
    this.data.paginator = this.paginator
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event){
    this.data.filter = (event.target as HTMLTextAreaElement).value.trim().toLowerCase()
  }
}
