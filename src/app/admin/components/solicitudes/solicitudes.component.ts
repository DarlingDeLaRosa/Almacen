import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { solicitudesService } from '../../Services/solicitudes.service';
import { AppState } from 'src/app/store/state';
import { Store } from '@ngrx/store';
import { catchError, combineLatest } from 'rxjs';
import { alertServerDown } from '../../Helpers/alertsFunctions';
import { solicitudes } from '../../models/interfaces';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit{
  
  dataFiltered: solicitudes[] = []
  url: string = ''
  token: string = ''
  pagina: number = 1
  loading: boolean = false;
  noPage: number = 1

  constructor(
    public dialog: MatDialog,
    private apiSolicitudes: solicitudesService,
    private store: Store<{ app: AppState }>
  ){}

  ngOnInit(): void {
    combineLatest([
      this.store.select(state => state.app.token),
      this.store.select(state => state.app.path)
    ]).subscribe(([tokenValue, pathValue]) => {

      this.url = pathValue;
      this.token = tokenValue;

      this.getSolicitudes()
    })
  }

  getSolicitudes() {
    this.loading = true;

    this.apiSolicitudes.getSolicitudes(this.url, this.token, this.pagina, 15)
      .pipe(
        catchError((error) => {
          this.loading = false
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        this.loading = false;
        this.noPage = res.cantPage
        this.dataFiltered = res.data
      });
  }


  nextPage() {
    if (this.pagina < this.noPage) {
      this.pagina += 1
      this.getSolicitudes()
    }
  }

  previousPage() {
    if (this.pagina > 1) {
      this.pagina -= 1
      this.getSolicitudes()
    }
  }
}
