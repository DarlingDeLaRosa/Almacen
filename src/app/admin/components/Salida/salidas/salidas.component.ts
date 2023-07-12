import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.css']
})
export class SalidasComponent implements AfterViewInit {

  generalITBIS: boolean = true;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'producto', 'cantidad', 'editar', 'eliminar'
  ];
  data = [
    {
      producto: 'azucar', cantidad: 10,
    },
    {
      producto: 'azucar', cantidad: 10,
    },
    {
      producto: 'azucar', cantidad: 10,
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

}
