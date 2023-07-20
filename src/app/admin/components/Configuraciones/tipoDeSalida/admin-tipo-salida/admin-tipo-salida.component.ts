import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { TipoDeSalidaModalComponent } from '../../../Modals/configuracion-modal/tipo-de-salida-modal/tipo-de-salida-modal.component';

@Component({
  selector: 'app-admin-tipo-salida',
  templateUrl: './admin-tipo-salida.component.html',
  styleUrls: ['./admin-tipo-salida.component.css']
})
export class AdminTipoSalidaComponent implements AfterViewInit{
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['nombre', 'descripcion', 'editar', 'eliminar'];
  data = new MatTableDataSource([
    {
      nombre: 'Donacion', descripcion: 'Cedido a un particular'
    },
    {
      nombre: 'Asignado', descripcion: 'Entregado a un departamento para su uso',
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
    this.dialog.open(TipoDeSalidaModalComponent)
  }

  removeAlert(){
    Swal.fire({
      title: '¡Alerta!',
      text: 'Está seguro que desea eliminar el tipo de salida.',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
  }
}
