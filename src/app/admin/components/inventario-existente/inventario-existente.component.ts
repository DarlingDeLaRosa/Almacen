import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-inventario-existente',
  templateUrl: './inventario-existente.component.html',
  styleUrls: ['./inventario-existente.component.css']
})
export class InventarioExistenteComponent {
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
