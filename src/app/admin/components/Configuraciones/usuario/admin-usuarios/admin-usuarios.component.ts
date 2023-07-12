import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalComponent } from '../../../Modals/product-modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css']
})
export class AdminUsuariosComponent implements AfterViewInit{
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['nombre', 'descripcion', 'marca', 'modelo', 'serial', 'condicion', 'precio', 'stock', 'editar', 'eliminar'];
  data = new MatTableDataSource(
    [
      {
        nombre: 'Azucar', descripcion: 'azucar blanca', marca: 'Lider', modelo: 'Sacarosa',
        serial: '100010023', condicion: 'Nuevo', precio: 2000, stock: 78
      },
      {
        nombre: 'Cafe', descripcion: 'Cafe arabica', marca: 'Cafe Santo Domingo', modelo: 'Caturra',
        serial: '100012294', condicion: 'Nuevo', precio: 4000, stock: 91
      },
      {
        nombre: 'Monitor', descripcion: '24 Pulgadas', marca: 'Dell', modelo: 's21sh2a',
        serial: '108992371', condicion: 'Usado', precio: 7500, stock: 4
      },
      {
        nombre: 'teclado', descripcion: '60%', marca: 'Logitec', modelo: 'RedM2593',
        serial: '966318874', condicion: 'reparado', precio: 2700, stock: 7
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
    this.dialog.open(ModalComponent)
  }

  applyFilter(event: Event){
    this.data.filter = (event.target as HTMLTextAreaElement).value.trim().toLowerCase()
  }
}
