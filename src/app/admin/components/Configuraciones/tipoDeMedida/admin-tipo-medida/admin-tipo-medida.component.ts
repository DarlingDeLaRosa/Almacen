import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { TipoDeMedidaModalComponent } from '../../../Modals/configuracion-modal/tipo-de-medida-modal/tipo-de-medida-modal.component';

@Component({
  selector: 'app-admin-tipo-medida',
  templateUrl: './admin-tipo-medida.component.html',
  styleUrls: ['./admin-tipo-medida.component.css']
})
export class AdminTipoMedidaComponent implements AfterViewInit{

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [ 'descripcion', 'editar', 'eliminar'];
  data = new MatTableDataSource([
    {
      descripcion: 'azucar blanca'
    },
    {
       descripcion: 'santo Domingo',
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
    this.dialog.open(TipoDeMedidaModalComponent)
  }

  removeAlert(){
    Swal.fire({
      title: '¡Alerta!',
      text: 'Está seguro que desea eliminar el tipo de Medida.',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
  }
}
