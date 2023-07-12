import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-tipo-almacen',
  templateUrl: './admin-tipo-almacen.component.html',
  styleUrls: ['./admin-tipo-almacen.component.css']
})
export class AdminTipoAlmacenComponent implements AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['nombre', 'editar', 'eliminar'];
  data = new MatTableDataSource([
    {
      nombre: 'Azucar'
    },
    {
      nombre: 'Cafe'
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
