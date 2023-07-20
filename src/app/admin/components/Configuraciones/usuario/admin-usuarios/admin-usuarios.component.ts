import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalComponent } from '../../../Modals/product-modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UsuarioModalComponent } from '../../../Modals/usuario-modal/usuario-modal.component';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css']
})
export class AdminUsuariosComponent implements AfterViewInit{
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['idRol', 'idRecinto', 'correo', 'nombre', 'apellido', 'cargo', 'cedula', 'telefono', 'ext', 'celular', 'creadoPor', 'editar', 'eliminar'];
  data = new MatTableDataSource(
    [
      {
        idRol: 'User', idRecinto: 'FEM', correo: 'tecnologia@isfodosu', nombre: 'Tecc',
        apellido: 'Nologia', cargo: 'Programador', cedula: '492-0643476-2' , telefono: '8294609634', ext: '245', celular: '8097340876', creadoPor: 'Admin3'
      }
    ]
  ) ;

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
    this.dialog.open(UsuarioModalComponent)
  }

  removeAlert(){
    Swal.fire({
      title: '¡Alerta!',
      text: 'Está seguro que desea eliminar el usuario.',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
  }

  applyFilter(event: Event){
    this.data.filter = (event.target as HTMLTextAreaElement).value.trim().toLowerCase()
  }
}
