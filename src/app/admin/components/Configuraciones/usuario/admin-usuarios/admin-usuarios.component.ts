import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioModalComponent } from '../../../Modals/usuario-modal/usuario-modal.component';
import { AppState, User } from 'src/app/store/state';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/admin/Services/Configuracion/usuarios.service';
import { Store } from '@ngrx/store';
import { catchError, combineLatest, throwError } from 'rxjs';
import { alertIsSuccess, alertRemoveSuccess, alertRemoveSure, alertServerDown, loading } from 'src/app/admin/Helpers/alertsFunctions';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css']
})
export class AdminUsuariosComponent implements OnInit {

  dataFiltered: User[] = []
  filterUser: FormGroup;
  url: string = ''
  noPage: number = 1
  token: string = ''
  pagina: number = 1
  loading: boolean = false;
  userEmail: string = '';

  constructor(
    public dialog: MatDialog,
    private api: UserService,
    private store: Store<{ app: AppState }>
  ) {
    this.filterUser = new FormGroup({
      filter: new FormControl(''),
    })
  }

  ngOnInit() {

    combineLatest([
      this.store.select(state => state.app.token),
      this.store.select(state => state.app.path),
      this.store.select(state => state.app.user.correo),
    ]).subscribe(([tokenValue, pathValue, user]) => {

      this.userEmail = user
      this.url = pathValue;
      this.token = tokenValue;

      this.getUser()
    })
  }

  getUser() {
    this.loading = true

    this.api.getUser(this.url, this.token, this.pagina,)
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
    if (this.filterUser.value.filter.length >= 3) {

      this.api.filterUser(this.url, this.token, this.pagina, this.filterUser.value.filter)
        .pipe(
          catchError((error) => {
            alertServerDown();
            return throwError(error) ;
          })
        )
        .subscribe((res: any) => {
          this.noPage = res.cantPage
          this.dataFiltered = res.data
        })

    } else {
      this.getUser()
    }
  }

  openModal(item: User) {
    let dialogRef = this.dialog.open(UsuarioModalComponent, { data: item })

    dialogRef.afterClosed().subscribe(() => {
      this.getUser()
    })
  }

  async removeAlert(item: number) {

    let removeChoise: boolean = await alertRemoveSure()

    if (removeChoise) {

      loading(true)

      this.api.removeUser(this.url, item, this.token)
        .pipe(
          catchError((error) => {
            loading(false)
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {
          loading(false)
          if (res.data !== null) { alertRemoveSuccess(); this.getUser() }
          else alertIsSuccess(false)
        })
    }
  }

  nextPage() {
    if (this.pagina < this.noPage) {
      this.pagina += 1
      this.getUser()
    }
  }

  previousPage() {
    if (this.pagina > 1) {
      this.pagina -= 1
      this.getUser()
    }
  }
}
