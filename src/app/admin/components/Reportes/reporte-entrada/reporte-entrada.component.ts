import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-reporte-entrada',
  templateUrl: './reporte-entrada.component.html',
  styleUrls: ['./reporte-entrada.component.css']
})
export class ReporteEntradaComponent implements AfterViewInit {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  info = {
    success: true,
    message: "La operación se realizó con éxito.  ",
    data: [
      {
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
          },
          {
            idEntradaDet: 10,
            idEntrada: 3,
            producto: {
              idProducto: 4,
              nombre: "Monitor",
              descripcion: "Pantalla",
              marca: "dell",
              modelo: "27 Pulgadas",
              serial: "mon01",
              condicion: "nuevo",
              precio: 200,
              stock: 2
            },
            precio: 200,
            cantidad: 2,
            subTotal: 400
          }
        ]
      },
      {
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
          },
          {
            idEntradaDet: 10,
            idEntrada: 3,
            producto: {
              idProducto: 4,
              nombre: "Monitor",
              descripcion: "Pantalla",
              marca: "dell",
              modelo: "27 Pulgadas",
              serial: "mon01",
              condicion: "nuevo",
              precio: 200,
              stock: 2
            },
            precio: 200,
            cantidad: 2,
            subTotal: 400
          },
          {
            idEntradaDet: 10,
            idEntrada: 3,
            producto: {
              idProducto: 4,
              nombre: "Monitor",
              descripcion: "Pantalla",
              marca: "dell",
              modelo: "27 Pulgadas",
              serial: "mon01",
              condicion: "nuevo",
              precio: 200,
              stock: 2
            },
            precio: 200,
            cantidad: 2,
            subTotal: 400
          }
        ]
      }
    ]
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //dataSource = this.info.data
  //producto:any = this.info
  ////hola:any = this.producto.map((item: any) => item)
  /*
  this.info.forEach(item => {
    const detalle = item.data.detalles

    detalle.forEach(detalle=> {
      this.producto.push(detalle.producto)
    })
  })*/
  dataDetalle = []
  displayedColumns: string[] = ['idProducto', 'nombre', 'descripcion', 'marca', 'modelo', 'serial', 'condicion', 'precio', 'stock']; //'idRecinto', 'idTipoAlm', 'idTipoEntrada', 'idTipoEntrega', 'numOrden', 'observacion', 'total',

  data = new MatTableDataSource([
    {
      idProducto:'2', nombre:'Cafe', descripcion:'Arabigo', marca:'Santo Domingo', modelo:'5215525', serial:'465484658', condicion:'nuevo', precio: 2000, stock:45
    },
    {
      idProducto:'1', nombre:'Azucar', descripcion:'Azucar blanca', marca:'Lider', modelo:'5719170', serial:'977615312', condicion:'nuevo', precio: 3500, stock:14
    },
    {
      idProducto:'3', nombre:'Cremola', descripcion:'Vainilla', marca:'cremZ', modelo:'63314782', serial:'99614217', condicion:'nuevo', precio: 500, stock:20
    }
  ]) ;

  constructor(private _liveAnnouncer: LiveAnnouncer) { }

  ngAfterViewInit(): void {
    this.data.sort = this.sort
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event){
    this.data.filter = (event.target as HTMLTextAreaElement).value.trim().toLowerCase()
  }
}
