import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TipoDeProductoModalComponent } from '../../../Modals/configuracion-modal/tipo-de-producto-modal/tipo-de-producto-modal.component';
import { GET, tipoProducto } from 'src/app/admin/models/interfaces';
import { FormControl, FormGroup } from '@angular/forms';
import { alertIsSuccess, alertRemoveSuccess, alertRemoveSure, alertServerDown, loading } from '../../../../Helpers/alertsFunctions';
import { AppState } from 'src/app/store/state';
import { Store } from '@ngrx/store';
import { catchError, combineLatest } from 'rxjs';
import { TipoDeProductoService } from 'src/app/admin/Services/Configuracion/tipo-de-producto.service';

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
  pagina: number = 1
  noPage: number = 1
  loading: boolean = false;

  constructor(
    public dialog: MatDialog,
    public api: TipoDeProductoService,
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

      this.getTipoProducto()
    })
  }

  getTipoProducto() {
    this.loading = true

    this.api.getTipoProducto(this.url, this.token, this.pagina, 15)
      .pipe(
        catchError((error) => {
          this.loading = false
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        this.loading = false
        this.noPage = res.cantPage
        this.dataFiltered = res.data
      })
  }

  dataFilter() {
    if (this.filterTipoProducto.value.filter.length >= 3) {

      this.api.filterTipoProducto(this.url, this.token, this.pagina, this.filterTipoProducto.value.filter)
        .pipe(
          catchError((error) => {
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {
          this.noPage = res.cantPage
          this.dataFiltered = res.data
        })
    } else {
      this.getTipoProducto()
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

    if (removeChoise) {
      loading(true)
      this.api.removeTipoProducto(this.url, item, this.token)
        .pipe(
          catchError((error) => {
            loading(false)
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {
          loading(false)
          if (res) { alertRemoveSuccess(); this.getTipoProducto() }
          else alertIsSuccess(false)
        })
    }
  }

  nextPage() {
    if (this.pagina < this.noPage) {
      this.pagina += 1
      this.getTipoProducto()
    }
  }

  previousPage() {
    if (this.pagina > 1) {
      this.pagina -= 1
      this.getTipoProducto()
    }
  }
}
