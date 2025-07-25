import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { catchError, combineLatest, throwError } from 'rxjs';
import { alertAuthSuccess, alertIsSuccess, alertRemoveSuccess, alertRemoveSure, alertServerDown, alertValidateSure, loading } from 'src/app/admin/Helpers/alertsFunctions';
import { salida } from 'src/app/admin/models/interfaces';
import { salidaService } from 'src/app/admin/Services/salida.service';
import { ShowDetailsSalidaComponent } from '../../Modals/show-details-salida/show-details-salida.component';

@Component({
  selector: 'app-admin-salidas',
  templateUrl: './admin-salidas.component.html',
  styleUrls: ['./admin-salidas.component.css']
})
export class AdminSalidasComponent implements OnInit {

  dataFiltered: salida[] = [];
  filterSalida: FormGroup;
  url: string = ''
  token: string = ''
  pagina: number = 1
  noPage: number = 1
  idRol: number = 0
  loading: boolean = false;
  todayDate!: Date
  recintoActual: number = 0
  recintoSelected: number = 7

  constructor(
    public dialog: MatDialog,
    private api: salidaService,
    private store: Store<{ app: AppState }>) {
    this.filterSalida = new FormGroup({
      filter: new FormControl(''),
    })
  }

  ngOnInit(): void {
    combineLatest([
      this.store.select(state => state.app.token),
      this.store.select(state => state.app.path),
      this.store.select(state => state.app.user.recinto.idRecinto),
      this.store.select(state => state.app.user.role.idRol),
    ]).subscribe(([tokenValue, pathValue, recinto, idRole]) => {

      this.url = pathValue;
      this.token = tokenValue;
      this.idRol = idRole;
      this.recintoActual = recinto

      this.getSalida()
    })
  }

  getSalida() {
    this.loading = true

    this.api.getSalida(this.url, this.token, this.pagina, 15, this.recintoSelected)
      .pipe(
        catchError((error) => {
          this.loading = false
          alertServerDown();
          return throwError(error);
        })
      )
      .subscribe((res: any) => {
        this.loading = false
        this.noPage = res.cantPage
        this.todayDate = new Date(res.dateNow)

        this.dataFiltered = res.data

        this.dataFiltered = res.data.map((item: any) => ({
          ...item, fechaCreacion: new Date(item.fechaCreacion)
        }));
      });
  }

  async authSalida(idSalida: number) {
    let removeChoise: boolean = await alertValidateSure()

    if (removeChoise) {
      this.loading = true
      this.api.authSalida(idSalida  , this.url, this.token)
        .pipe(
          catchError((error) => {
            this.loading = false; alertServerDown();
            return throwError(error);
          })
        )
        .subscribe((res: any) => {
          if (res.success) {
            this.loading = false
            alertAuthSuccess()
            this.getSalida()
          }
        });
    }
  }

  onInputFilterChange() {
    if (this.filterSalida.value.filter.length >= 2) {

      this.api.filterSalida(this.url, this.token, this.pagina, this.filterSalida.value.filter)
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
      this.getSalida()
    }
  }

  openModal(detailId: salida) {
    let dialogRef = this.dialog.open(ShowDetailsSalidaComponent, { data: detailId })

    dialogRef.afterClosed().subscribe(() => {
    })
  }

  async removeAlert(item: number) {
    let removeChoise: boolean = await alertRemoveSure()

    if (removeChoise) {
      loading(true)
      this.api.removeSalida(this.url, item, this.token)
      .pipe(
        catchError((error) => {
          loading(false)
          alertServerDown();
          return error;
        })
      )    
      .subscribe((res: any) => {
          loading(false)
          if (res.data !== null) alertRemoveSuccess()
          else alertIsSuccess(false)
          this.getSalida()
        })
    }
  }

  nextPage() {
    if (this.pagina < this.noPage) {
      this.pagina += 1
      this.getSalida()
    }
  }

  previousPage() {
    if (this.pagina > 1) {
      this.pagina -= 1
      this.getSalida()
    }
  }

}
