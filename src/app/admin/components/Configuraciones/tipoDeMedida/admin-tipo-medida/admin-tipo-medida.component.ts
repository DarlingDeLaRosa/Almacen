import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TipoDeMedidaModalComponent } from '../../../Modals/configuracion-modal/tipo-de-medida-modal/tipo-de-medida-modal.component';
import { tipoMedida } from 'src/app/admin/models/interfaces';
import { FormControl, FormGroup } from '@angular/forms';
import { AppState } from 'src/app/store/state';
import { Store } from '@ngrx/store';
import { catchError, combineLatest } from 'rxjs';
import { alertIsSuccess, alertRemoveSuccess, alertRemoveSure, alertServerDown, loading } from 'src/app/admin/Helpers/alertsFunctions';
import { TipoDeMedidaService } from 'src/app/admin/Services/Configuracion/tipo-de-medida.service';

@Component({
  selector: 'app-admin-tipo-medida',
  templateUrl: './admin-tipo-medida.component.html',
  styleUrls: ['./admin-tipo-medida.component.css']
})
export class AdminTipoMedidaComponent implements OnInit {

  dataFiltered: tipoMedida[] = []
  filterTipoMedida: FormGroup;
  url: string = ''
  noPage: number = 1
  token: string = ''
  pagina: number = 1
  loading: boolean = false;

  constructor(
    public dialog: MatDialog,
    private api: TipoDeMedidaService,
    private store: Store<{ app: AppState }>
  ) {
    this.filterTipoMedida = new FormGroup({
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

      this.getTipoMedida()
    })
  }

  getTipoMedida() {
    this.loading = true

    this.api.getTipoMedida(this.url, this.token, this.pagina, 15)
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
    if (this.filterTipoMedida.value.filter.length >= 3) {

      this.api.filterTipoMedida(this.url, this.token, this.pagina, this.filterTipoMedida.value.filter)
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
      this.getTipoMedida()
    }
  }

  openModal(item: tipoMedida) {
    let dialogRef = this.dialog.open(TipoDeMedidaModalComponent, { data: item })

    dialogRef.afterClosed().subscribe(() => {
      this.getTipoMedida()
    })
  }

  async removeAlert(item: number) {

    let removeChoise: boolean = await alertRemoveSure()

    if (removeChoise) {
      loading(true)
      this.api.removeTipoMedida(this.url, item, this.token)
        .pipe(
          catchError((error) => {
            loading(false)
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {
          loading(false)
          if (res) { alertRemoveSuccess(); this.getTipoMedida() }
          else alertIsSuccess(false)
        })
    }
  }

  nextPage() {
    if (this.pagina < this.noPage) {
      this.pagina += 1
      this.getTipoMedida()
    }
  }

  previousPage() {
    if (this.pagina > 1) {
      this.pagina -= 1
      this.getTipoMedida()
    }
  }
}
