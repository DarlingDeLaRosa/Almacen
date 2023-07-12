import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css']
})
export class EntradasComponent implements AfterViewInit {
  generalITBIS: boolean = true;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'producto', 'cantidad', 'precio', 'itbis', 'subtotal', 'editar', 'eliminar'
  ];
  data = [
    {
      producto: 'azucar', cantidad: 10, precio: 200, itbis: 32, subtotal: 2320
    },
    {
      producto: 'azucar', cantidad: 10, precio: 200, itbis: 32, subtotal: 2320
    },
    {
      producto: 'azucar', cantidad: 10, precio: 200, itbis: 32, subtotal: 2320
    }
  ];

  dataSource = new MatTableDataSource(this.data)

  constructor(private _liveAnnouncer: LiveAnnouncer){}

  itbisOption(event : any){
    this.generalITBIS = event.value;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getItbis(){
    return this.data.map((item)=> item.itbis).reduce((acc, value) => acc + value, 0)
  }
  getSubtotal(){
    return this.data.map((item)=> item.subtotal).reduce((acc, value) => acc + value, 0)
  }
}
