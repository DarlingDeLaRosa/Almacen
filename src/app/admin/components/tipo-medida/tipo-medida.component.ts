import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tipo-medida',
  templateUrl: './tipo-medida.component.html',
  styleUrls: ['./tipo-medida.component.css']
})
export class TipoMedidaComponent implements AfterViewInit{

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['unidad', 'descripcion', 'editar', 'eliminar'];
  data = new MatTableDataSource([
    {
      unidad: 'unidad', descripcion: 'azucar blanca'
    },
    {
      unidad: 'Cafe', descripcion: 'santo Domingo',
    }
  ])

  constructor(public dialog: MatDialog, private _liveAnnouncer: LiveAnnouncer){}

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

  applyFilter(event: Event) {
    this.data.filter = (event.target as HTMLTextAreaElement).value.trim().toLowerCase()
  }

  openModal() {
    //this.dialog.open(ModalComponent)
  }
}
