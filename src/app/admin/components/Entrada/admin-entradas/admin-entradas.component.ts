import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EntradaModalComponent } from '../../Modals/entrada-modal/entrada-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-entradas',
  templateUrl: './admin-entradas.component.html',
  styleUrls: ['./admin-entradas.component.css']
})
export class AdminEntradasComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  info = {
    success: true,
    message: "La operación se realizó con éxito.  ",
    data: {
      idEntrada: 4,
      recinto: {
        idRecinto: 1,
        nombre: "FEM"
      },
      tipoEntrada: {
        idTipoEntrada: 1,
        nombre: "Requisicion",
        descripcion: "Entrada por defecto Update"
      },
      tipoAlm: {
        idTipoAlm: 1,
        nombre: "Almacen de toner"
      },
      tipoEntrega: {
        idTipoEntrega: 2,
        nombre: "Entrega parcial",
        descripcion: "Por lotes"
      },
      proveedor: {
        idProveedor: 3,
        nombre: "Ing. Jonas Diaz"
      },
      numOrden: "OR03",
      fechaFactura: "2023-07-05T00:00:00",
      fechaCreacion: "2023-07-11T08:23:47.087",
      total: 5000,
      observacion: "Esro prueba para rastrear la insertcion del producto",
      fechaModif: null,
      creadoPor: {
        idUsuario: 109,
        nombre: "Jonas",
        apellido: "admin",
        cargo: "Software Developer"
      },
      detalles: [
        {
          idEntradaDet: 11,
          idEntrada: 4,
          producto: {
            idProducto: 7,
            nombre: "cpu",
            descripcion: "computadora",
            marca: "dell",
            modelo: "i5 5ta generacion",
            serial: "cpu01",
            condicion: "nueva",
            precio: 500,
            stock: 10
          },
          precio: 500,
          cantidad: 10,
          subTotal: 5000
        }
      ]
    }
  }

  displayedColumns: string[] = ['recinto', 't_entrada', 't_almacen', 't_entrega', 'proveedor', 'fechaCreacion', 'total', 'detalles', 'editar', 'eliminar'];
  data = new MatTableDataSource(
    [
      {
        recinto: this.info.data.recinto.nombre ,
        t_entrada: this.info.data.tipoEntrada.nombre,
        t_almacen: this.info.data.tipoAlm.nombre,
        t_entrega: this.info.data.tipoEntrega.nombre,
        proveedor: this.info.data.proveedor.nombre,
        fechaCreacion: this.info.data.fechaCreacion,
        total: this.info.data.total,
        creadoPor: `${this.info.data.creadoPor.nombre} ${this.info.data.creadoPor.apellido}`,
        detalles: this.info.data.detalles.length
      },

    ]
  );

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
    this.dialog.open(EntradaModalComponent)
  }

  removeAlert(){
    Swal.fire({
      title: '¡Alerta!',
      text: 'Esta seguro que desea eliminar la entrada',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
  }

  applyFilter(event: Event) {
    this.data.filter = (event.target as HTMLTextAreaElement).value.trim().toLowerCase()
  }
}
