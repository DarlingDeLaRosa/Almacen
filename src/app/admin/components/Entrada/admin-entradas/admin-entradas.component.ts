import { Component, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { catchError, combineLatest, throwError } from 'rxjs';
import { alertAuthSuccess, alertBackMessage, alertIsSuccess, alertRemoveSuccess, alertRemoveSure, alertServerDown, alertValidateSure, loading } from 'src/app/admin/Helpers/alertsFunctions';
import { entradaService } from 'src/app/admin/Services/entrada.service';
import { Entrada } from 'src/app/admin/models/interfaces';
import { ShowDetailsComponent } from '../../Modals/show-details/show-details.component';
import { FunctionHelperService } from 'src/app/admin/Helpers/functionHerlper.service';

@Component({
  selector: 'app-admin-entradas',
  templateUrl: './admin-entradas.component.html',
  styleUrls: ['./admin-entradas.component.css']
})
export class AdminEntradasComponent implements OnInit {

  dataFiltered: Entrada[] = [];
  filterEntrada: FormGroup;
  url: string = '';
  token: string = '';
  pagina: number = 1;
  noPage: number = 1;
  idRol: number = 0;
  loading: boolean = false;
  todayDate!: Date
  recintoActual: number = 0
  recintoSelected: number = 7

  constructor(
    public dialog: MatDialog,
    private api: entradaService,
    public helper: FunctionHelperService,
    private store: Store<{ app: AppState }>) {
    this.filterEntrada = new FormGroup({
      filter: new FormControl(''),
    })

  }

  ngOnInit(): void {
    combineLatest([
      this.store.select(state => state.app.token),
      this.store.select(state => state.app.path),
      this.store.select(state => state.app.user.recinto.idRecinto),
      this.store.select(state => state.app.user.role.idRol),
    ]).subscribe(([tokenValue, pathValue, recinto, idRol]) => {

      this.url = pathValue;
      this.token = tokenValue;
      this.idRol = idRol
      this.recintoActual = recinto

      this.getEntrada()
    })
  }

  getEntrada() {
    this.loading = true
    
    this.api.getEntrada(this.url, this.token, this.pagina, 15, this.recintoSelected)
      .pipe(
        catchError((error) => {
          this.loading = false;
          alertServerDown();
          return throwError(error);
        })
      )
      .subscribe((res: any) => {
        this.loading = false
        this.todayDate = new Date(res.dateNow)

        this.noPage = res.cantPage
        this.dataFiltered = res.data

        this.dataFiltered = res.data.map((item: any) => ({
          ...item, fechaCreacion: new Date(item.fechaCreacion)
        }));
      });
  }

  async authEntrada(idEntrada: number) {
    let removeChoise: boolean = await alertValidateSure()

    if (removeChoise) {
      this.loading = true
      this.api.authEntrada(idEntrada, this.url, this.token)
        .pipe(
          catchError((error) => {
            this.loading = false; alertServerDown();
            return throwError(error);
          })
        )
        .subscribe((res: any) => {
          if (res.success) {
            alertAuthSuccess()
            this.loading = false
            this.getEntrada()
          }
        });
    }
  }

  onInputFilterChange() {
    if (this.filterEntrada.value.filter.length >= 2) {
      this.loading = true

      this.api.filterEntrada(this.url, this.token, this.pagina, this.filterEntrada.value.filter)
        .pipe(
          catchError((error) => {
            this.loading = false;
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {
          this.loading = false;
          this.noPage = res.cantPage
          this.dataFiltered = res.data
        })
    } else {
      this.getEntrada()
    }
  }

  openModal(detailId: number) {
    let dialogRef = this.dialog.open(ShowDetailsComponent, { data: detailId })
    dialogRef.afterClosed().subscribe(() => { })
  }

  async removeAlert(item: number) {
    let removeChoise: boolean = await alertRemoveSure()

    if (removeChoise) {
      loading(true)
      this.api.removeEntrada(this.url, item, this.token)
        .pipe(
          catchError((error) => {
            loading(false)
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {
          loading(false)
          if (res.data != null) { alertRemoveSuccess(); this.getEntrada() }
          else alertBackMessage(res.message)
        })
    }
  }

  nextPage() {
    if (this.pagina < this.noPage) {
      this.pagina += 1
      this.getEntrada()
    }
  }

  previousPage() {
    if (this.pagina > 1) {
      this.pagina -= 1
      this.getEntrada()
    }
  }

}
