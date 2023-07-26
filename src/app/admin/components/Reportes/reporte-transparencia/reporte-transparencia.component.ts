import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-reporte-transparencia',
  templateUrl: './reporte-transparencia.component.html',
  styleUrls: ['./reporte-transparencia.component.css']
})
export class ReporteTransparenciaComponent implements AfterViewInit{
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  dates(){
    console.log(this.range)
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['nombre', 'descripcion', 'marca', 'modelo', 'serial', 'condicion', 'precio', 'stock', 'unidadMedida', 't_producto'];
  data = new MatTableDataSource(

    [
      {
        nombre: 'Azucar', descripcion: 'azucar blanca', marca: 'Lider', modelo: 'Sacarosa',
        serial: '100010023', condicion: 'Nuevo', precio: 2000, stock: 78, unidadMedida: 'libra', t_producto: 'cocina'
      },

    ]
  ) ;

  constructor(private _liveAnnouncer: LiveAnnouncer) { }

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
