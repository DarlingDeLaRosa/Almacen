import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TipoDeSalidaModalComponent } from '../../../Modals/configuracion-modal/tipo-de-salida-modal/tipo-de-salida-modal.component';
import { FormControl, FormGroup } from '@angular/forms';
import { alertIsSuccess, alertRemoveSuccess, alertRemoveSure, alertServerDown, loading } from '../../../../Helpers/alertsFunctions';
import { TipoDeSalidaService } from 'src/app/admin/Services/Configuracion/tipo-de-salida.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { catchError, combineLatest } from 'rxjs';
import { GET, tipoSalida } from 'src/app/admin/models/interfaces';

@Component({
  selector: 'app-admin-tipo-salida',
  templateUrl: './admin-tipo-salida.component.html',
  styleUrls: ['./admin-tipo-salida.component.css']
})
export class AdminTipoSalidaComponent implements OnInit {

  dataFiltered: tipoSalida[] = []
  filterTipoSalida: FormGroup;
  url: string = ''
  noPage: number = 1
  token: string = ''
  pagina: number = 1
  loading: boolean = false;

  constructor(
    public dialog: MatDialog,
    private api: TipoDeSalidaService,
    private store: Store<{ app: AppState }>
  ) {
    this.filterTipoSalida = new FormGroup({
      filter: new FormControl(''),
    })
  }


  ngOnInit() {

    combineLatest([
      this.store.select(state => state.app.token),
      this.store.select(state => state.app.path)
    ]).subscribe(([tokenValue, pathValue]) => {

      this.url = pathValue;
      this.token = tokenValue;

      this.getTipoSalida()
    })
  }

  getTipoSalida() {
    this.loading = true

    this.api.getTipoSalida(this.url, this.token, this.pagina, 15)
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
      });
  }

  dataFilter() {
    if (this.filterTipoSalida.value.filter.length >= 3) {

      this.api.filterTipoSalida(this.url, this.token, this.pagina, this.filterTipoSalida.value.filter)
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
      this.getTipoSalida()
    }
  }

  openModal(item: tipoSalida) {
    let dialogRef = this.dialog.open(TipoDeSalidaModalComponent, { data: item })

    dialogRef.afterClosed().subscribe(() => {
      this.getTipoSalida()
    })
  }

  async removeAlert(item: number) {

    let removeChoise: boolean = await alertRemoveSure()

    if (removeChoise) {
      loading(true)
      this.api.removeTipoSalida(this.url, item, this.token)
        .pipe(
          catchError((error) => {
            loading(false)
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {
          loading(false)
          if (res.data !== null) { alertRemoveSuccess(); this.getTipoSalida() }
          else alertIsSuccess(false)
        })
    }
  }

  nextPage() {
    if (this.pagina < this.noPage) {
      this.pagina += 1
      this.getTipoSalida()
    }
  }

  previousPage() {
    if (this.pagina > 1) {
      this.pagina -= 1
      this.getTipoSalida()
    }
  }
}
