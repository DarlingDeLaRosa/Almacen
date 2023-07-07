import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['nombre', 'rnc', 'representante', 'editar', 'eliminar'];
  data = new MatTableDataSource([
    {
      nombre: 'Azucar', rnc: 'azucar blanca', representante: 'Lider',
    },
    {
      nombre: 'Cafe', rnc: 'Negro', representante: 'santo Domingo',
    },
    {
      nombre: 'Dulce', rnc: 'de leche', representante: 'del nacional',
    },
    {
      nombre: 'Leche', rnc: 'dos pinos', representante: 'del caribe',
    },
    {
      nombre: 'Jugo', rnc: 'cereza', representante: 'del patio',
    },
    {
      nombre: 'Sal', rnc: 'en grano', representante: 'Bravo',
    },
    {
      nombre: 'Cremola', rnc: 'de vainilla', representante: 'Lider',
    },
    {
      nombre: 'Leche', rnc: 'dos pinos', representante: 'del caribe',
    },
    {
      nombre: 'Jugo', rnc: 'cereza', representante: 'del patio',
    },
    {
      nombre: 'Sal', rnc: 'en grano', representante: 'Bravo',
    },

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
