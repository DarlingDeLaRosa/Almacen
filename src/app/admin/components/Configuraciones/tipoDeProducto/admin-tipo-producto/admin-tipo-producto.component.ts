import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TipoDeProductoModalComponent } from '../../../Modals/configuracion-modal/tipo-de-producto-modal/tipo-de-producto-modal.component';
import { tipoProducto } from 'src/app/admin/models/interfaces';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { alertIsSuccess, alertRemoveSure } from '../../../../Helpers/alertsFunctions';
import { AppState } from 'src/app/store/state';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-admin-tipo-producto',
  templateUrl: './admin-tipo-producto.component.html',
  styleUrls: ['./admin-tipo-producto.component.css']
})
export class AdminTipoProductoComponent implements OnInit {

  dataFiltered: tipoProducto[] = [];
  filterTipoProducto: FormGroup;
  url: string = ''
  token: string = ''
  pagina: number = 0

  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    private store: Store<{ app: AppState }>
  ) {
    this.filterTipoProducto = new FormGroup({
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

      //this.getTipoSalida()
    })
  }

  getTipoProducto() {

  }

  onInputFilterChange(event: Event) {
    const searchTerm = event.target as HTMLInputElement;
    if (searchTerm.value.length >= 2) {
      //this.dataFiltered = this.data;
      this.dataFiltered = this.dataFiltered.filter(item => {
        return item.nombre.toLowerCase().includes(searchTerm.value.toLowerCase());
      })

    } else {
      //this.dataFiltered = this.data;
    }
  }

  openModal(item: tipoProducto) {
    let dialogRef = this.dialog.open(TipoDeProductoModalComponent, { data: item })

    dialogRef.afterClosed().subscribe(() => {
      this.getTipoProducto()
    })
  }

  async removeAlert(item: number) {
    let removeChoise: boolean = await alertRemoveSure()

    //if (removeChoise) {
    //  this.api.removeTipoSalida(this.url, item, this.token)
    //    .subscribe((res: any) => {
    //
    //      if (res) {
    //        alertRemoveSuccess()
    //        this.getTipoSalida()
    //      } else {
    //        alertIsSuccess(false)
    //      }
    //      () => {
    //        alertServerDown();
    //      }
    //    })
    //}
  }
}
