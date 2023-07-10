import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css']
})
export class EntradasComponent {
  generalITBIS!: boolean;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'fecha', 'recinto', 'proveedor', 'tipoAlmacen',
    'tipoEntrada', 'tipoEntrega', 'numOrden','producto',
     'cantidad', 'precio', 'editar', 'eliminar'
  ];
  data = new MatTableDataSource([
    {
      fecha: '10/07/23', recinto: 'FEM', proveedor: 'Bravo', tipoAlmacen: 'cocina',
      tipoEntrada: 'Compra', tipoEntrega: 'bien', numOrden: '14465896645', observacion: 'necesario',
      producto: 'azucar', cantidad: 10, precio: 200,
    },
    {
      fecha: '10/07/23', recinto: 'FEM', proveedor: 'Bravo', tipoAlmacen: 'cocina',
      tipoEntrada: 'Compra', tipoEntrega: 'bien', numOrden: '14465896645', observacion: 'necesario',
      producto: 'azucar', cantidad: 10, precio: 200,
    },
    {
      fecha: '10/07/23', recinto: 'FEM', proveedor: 'Bravo', tipoAlmacen: 'cocina',
      tipoEntrada: 'Compra', tipoEntrega: 'bien', numOrden: '14465896645', observacion: 'necesario',
      producto: 'azucar', cantidad: 10, precio: 200,
    },
    {
      fecha: '10/07/23', recinto: 'FEM', proveedor: 'Bravo', tipoAlmacen: 'cocina',
      tipoEntrada: 'Compra', tipoEntrega: 'bien', numOrden: '14465896645', observacion: 'necesario',
      producto: 'azucar', cantidad: 10, precio: 200,
    },
    {
      fecha: '10/07/23', recinto: 'FEM', proveedor: 'Bravo', tipoAlmacen: 'cocina',
      tipoEntrada: 'Compra', tipoEntrega: 'bien', numOrden: '14465896645', observacion: 'necesario',
      producto: 'azucar', cantidad: 10, precio: 200,
    }

  ]);

  constructor(private _liveAnnouncer: LiveAnnouncer){}

  itbisOption(event : any){
    this.generalITBIS = event.value;
  }

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
}
