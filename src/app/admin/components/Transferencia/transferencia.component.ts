import { Component, OnInit } from '@angular/core';
import { salida } from '../../models/interfaces';
import { FormGroup } from '@angular/forms';
import { AppState } from 'src/app/store/state';
import { salidaService } from '../../Services/salida.service';
import { Store } from '@ngrx/store';
import { catchError, combineLatest } from 'rxjs';
import { alertServerDown } from '../../Helpers/alertsFunctions';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

  dataFiltered: salida[] = [];
  url: string = ''
  token: string = ''
  pagina: number = 1
  noPage: number = 1
  idRol: number = 0
  loading: boolean = false;

  constructor(
    private api: salidaService,
    private store: Store<{ app: AppState }>
  ) { }


  ngOnInit(): void {
    combineLatest([
      this.store.select(state => state.app.token),
      this.store.select(state => state.app.path),
      this.store.select(state => state.app.user.role.idRol),
    ]).subscribe(([tokenValue, pathValue, idRole]) => {

      this.url = pathValue;
      this.token = tokenValue;
      this.idRol = idRole

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
          return error;
        })
      )
      .subscribe((res: any) => {
        console.log(res)
        this.loading = false
        this.noPage = res.cantPage
        this.dataFiltered = res.data
      });
  }
}
