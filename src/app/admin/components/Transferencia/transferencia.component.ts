import { Component, Output, OnInit, EventEmitter  } from '@angular/core';
import { salida, salidaTrans } from '../../models/interfaces';
import { AppState } from 'src/app/store/state';
import { salidaService } from '../../Services/salida.service';
import { Store } from '@ngrx/store';
import { catchError, combineLatest, throwError } from 'rxjs';
import { alertIsSuccess, alertRemoveSuccess, alertRemoveSure, alertServerDown, loading } from '../../Helpers/alertsFunctions';
import { ShowDetailsSalidaComponent } from '../Modals/show-details-salida/show-details-salida.component';
import { MatDialog } from '@angular/material/dialog';
import { entradaService } from '../../Services/entrada.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

  dataFiltered: salidaTrans[] = [];
  dataFilteredPending: salidaTrans[] = [];
  dataFilteredAccept: salidaTrans[] = [];
  dataFilteredCancel: salidaTrans[] = [];
  url: string = ''
  token: string = ''
  pagina: number = 1
  noPage: number = 1
  idRol: number = 0
  recinto: string = ''
  loading: boolean = false;
  estado: string = 'PENDIENTE'
  transferencia = { idTransferencia: 0}
  transferenciaForm: FormGroup;
  
  // @Output() transferChange = new EventEmitter<void>()

  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    private api: salidaService,
    private apiEntrada: entradaService,
    private store: Store<{ app: AppState }>
  ) {

    this.transferenciaForm = this.fb.group({
      idTransferencia: new FormControl('', Validators.required),
    })
   }


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
        this.loading = false

        this.noPage = res.cantPage
        this.dataFiltered = []
        this.dataFilteredAccept = []
        this.dataFilteredPending = []

        console.log(res);
        
        res.data.map((estadoSalida: any) => {
          
          if (estadoSalida.estado == 'PENDIENTE' && estadoSalida.recinto.nombre !== this.recinto) {
            this.dataFilteredPending.push(estadoSalida)
          
          }else if (estadoSalida.estado == 'EN PROCESO') {
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
    //this.apiEntrada.miVariable$.next(!this.apiEntrada.miVariable$);
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

  validarTransferencia(id: number) {
    loading(true)
    this.apiEntrada.putTransferenciaAceptar(this.url, id, this.token)
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
