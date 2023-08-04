import { Component, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { combineLatest } from 'rxjs';
import { alertIsSuccess, alertRemoveSuccess, alertRemoveSure, alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';

@Component({
  selector: 'app-admin-entradas',
  templateUrl: './admin-entradas.component.html',
  styleUrls: ['./admin-entradas.component.css']
})
export class AdminEntradasComponent implements OnInit {

  url: string = ''
  token: string = ''
  pagina: number = 0
  filterEntrada: FormGroup;

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

  constructor(
    public dialog: MatDialog,
    private store: Store<{ app: AppState }>) {
    this.filterEntrada = new FormGroup({
      filter: new FormControl(''),
    })
   }

  ngOnInit(): void {
    combineLatest([
      this.store.select(state => state.app.token),
      this.store.select(state => state.app.path)
    ]).subscribe(([tokenValue, pathValue]) => {

      this.url = pathValue;
      this.token = tokenValue;

      //this.getEntrada()
    })
  }

  onInputFilterChange(event: Event) {
    console.log(event)
  }

  async removeAlert(item: number){
    let removeChoise: boolean = await alertRemoveSure()

    if (removeChoise) {
      //this.api.removeTipoSalida(this.url, item, this.token)
        //.subscribe((res: any) => {

          //if (res) {
          //  alertRemoveSuccess()
            //this.getTipoSalida()
          //} else {
          //  alertIsSuccess(false)
          //}
          //() => {
          //  alertServerDown();
          //}
        //})
    }
  }

}
