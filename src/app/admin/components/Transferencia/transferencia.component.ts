import { Component,  OnInit } from '@angular/core';
import { salida, salidaTrans } from '../../models/interfaces';
import { AppState } from 'src/app/store/state';
import { salidaService } from '../../Services/salida.service';
import { Store } from '@ngrx/store';
import { catchError, combineLatest, throwError } from 'rxjs';
import { alertIsSuccess, alertRemoveSuccess, alertRemoveSure, alertServerDown, loading } from '../../Helpers/alertsFunctions';
import { ShowDetailsSalidaComponent } from '../Modals/show-details-salida/show-details-salida.component';
import { MatDialog } from '@angular/material/dialog';
import { entradaService } from '../../Services/entrada.service';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

  dataFiltered: salidaTrans[] = [];
  dataFilteredAccept: salidaTrans[] = [];
  dataFilteredCancel: salidaTrans[] = [];
  url: string = ''
  token: string = ''
  pagina: number = 1
  noPage: number = 1
  idRol: number = 0
  recinto: string = ''
  loading: boolean = false;
  estado: string = 'EN PROCESO'

  constructor(
    public dialog: MatDialog,
    private api: salidaService,
    private apiEntrada: entradaService,
    private store: Store<{ app: AppState }>
  ) { }


  ngOnInit(): void {
    combineLatest([
      this.store.select(state => state.app.token),
      this.store.select(state => state.app.path),
      this.store.select(state => state.app.user.role.idRol),
      this.store.select(state => state.app.user.recinto.nombre),
    ]).subscribe(([tokenValue, pathValue, idRole, recintoNombre]) => {

      this.url = pathValue;
      this.token = tokenValue;
      this.idRol = idRole
      this.recinto = recintoNombre

      this.getSalidaTransferencia()
    })
  }

  getSalidaTransferencia() {
    this.loading = true

    this.api.getSalidaTransferencia(this.url, this.token, this.pagina)
      .pipe(
        catchError((error) => {
          this.loading = false
          alertServerDown();
          return throwError(error);
        })
      )
      .subscribe((res: any) => {
        console.log(res)
        this.loading = false
        this.noPage = res.cantPage
        this.dataFiltered = []
        this.dataFilteredAccept = []


        res.data.map((estadoSalida: any) => {
          if (estadoSalida.estado == 'EN PROCESO') {

            this.dataFiltered.push(estadoSalida)

          } else if (estadoSalida.estado == 'RECIBIDO') {

            this.dataFilteredAccept.push(estadoSalida)

          } else if (estadoSalida.estado == 'CANCELADO') {

            this.dataFilteredCancel.push(estadoSalida)

          }
        })
      });
  }


  aceptarTransferencia(id: number) {
    loading(true)

    this.apiEntrada.postTransferenciaEntrada(this.url, id, this.token)
      .pipe(
        catchError((error) => {
          loading(false)
          alertServerDown();
          return throwError(error);
        })
      )
      .subscribe((res: any) => {

        this.noPage = res.cantPage
        loading(false)
        alertIsSuccess(true)
        this.getSalidaTransferencia()

      });
  }

  async removeAlert(id: number) {
    let removeChoise: boolean = await alertRemoveSure()

    if (removeChoise) {
      loading(true)
      this.api.removeSalida(this.url, id, this.token)
        .pipe(
          catchError((error) => {
            loading(false)
            alertServerDown();
            return throwError(error);
          })
        )
        .subscribe((res: any) => {

          loading(false)
          if (res.data !== null) alertRemoveSuccess()
          else alertIsSuccess(false)
          this.getSalidaTransferencia()
        })
    }
  }

  openModal(detailId: salida) {
    let dialogRef = this.dialog.open(ShowDetailsSalidaComponent, { data: detailId })

    dialogRef.afterClosed().subscribe(() => {
    })
  }

  nextPage() {
    if (this.pagina < this.noPage) {
      this.pagina += 1
      this.getSalidaTransferencia()
    }
  }

  previousPage() {
    if (this.pagina > 1) {
      this.pagina -= 1
      this.getSalidaTransferencia()
    }
  }
}
