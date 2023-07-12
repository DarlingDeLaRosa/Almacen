import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-proveedores',
  templateUrl: './admin-proveedores.component.html',
  styleUrls: ['./admin-proveedores.component.css']
})
export class AdminProveedoresComponent implements AfterViewInit{
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['nombre', 'rnc', 'representante', 'editar', 'eliminar'];
  data = new MatTableDataSource([
    {
      nombre: 'Azucar', rnc: 'azucar blanca', representante: 'Lider',
    },
    {
      nombre: 'Cafe', rnc: 'Negro', representante: 'santo Domingo',
    }

  ]);

  constructor(public dialog: MatDialog, private _liveAnnouncer: LiveAnnouncer) { }

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

  openModal() {
    //this.dialog.open(ModalComponent)
  }

  applyFilter(event: Event) {
    this.data.filter = (event.target as HTMLTextAreaElement).value.trim().toLowerCase()
  }
}
