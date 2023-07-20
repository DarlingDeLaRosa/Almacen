import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { TipoDeProductoModalComponent } from '../../../Modals/configuracion-modal/tipo-de-producto-modal/tipo-de-producto-modal.component';

@Component({
  selector: 'app-admin-tipo-producto',
  templateUrl: './admin-tipo-producto.component.html',
  styleUrls: ['./admin-tipo-producto.component.css']
})
export class AdminTipoProductoComponent implements AfterViewInit{
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
  ])

  constructor(public dialog: MatDialog, private _liveAnnouncer: LiveAnnouncer) {}

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
    this.dialog.open(TipoDeProductoModalComponent)
  }

  removeAlert(){
    Swal.fire({
      title: '¡Alerta!',
      text: 'Está seguro que desea eliminar el tipo de producto.',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
  }
}
