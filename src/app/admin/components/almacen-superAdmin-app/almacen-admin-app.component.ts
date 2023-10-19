import { Component, OnInit, effect } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { alertLogOut, alertServerDown } from '../../Helpers/alertsFunctions';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { ChangePasswordComponent } from '../Modals/change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';
import { catchError, filter, map, throwError } from 'rxjs';
import { salidaService } from '../../Services/salida.service';
import { App } from 'src/app/store/actions';
import { inicialState } from 'src/app/store/reducer';
import { TransferenciaComponent } from '../Transferencia/transferencia.component';
import { entradaService } from '../../Services/entrada.service';

@Component({
  selector: 'app-almacen-admin-app',
  templateUrl: './almacen-admin-app.component.html',
  styleUrls: ['./almacen-admin-app.component.css']
})
export class AlmacenAdminAppComponent implements OnInit {

  dataFiltered: number = 0;
  url!: string;
  token!: string
  sidenavOpened: boolean = false;
  userName$ = this.store.select(state => state.app.user.nombre)
  userLastName$ = this.store.select(state => state.app.user.apellido)
  userEmail$ = this.store.select(state => state.app.user.correo)
  userPosition$ = this.store.select(state => state.app.user.cargo)
  recinto$ = this.store.select(state => state.app.user.recinto.nombre)
  firstLetter = this.userName$.pipe(map(letter => letter.charAt(0).toUpperCase()))

  submenu: boolean = false;
  submenuConfig: boolean = false;
  submenuEntrada: boolean = false;
  submenuSalida: boolean = false;
  submenuProductos: boolean = false;

  constructor(
    public dialog: MatDialog,
    private store: Store<{ app: AppState }>,
    private apiSalida: salidaService,
    //private apiEntrada: entradaService,
    private local: LocalStorageService,
    private api: AuthService,
    //private transferCom: TransferenciaComponent,
    private router: Router,
  ) {

    // this.apiEntrada.eventoEmitido.subscribe(() => {
    //   this.getSalidaTransferencia();
    // });
  }

  ngOnInit() {
    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
    
    //this.apiEntrada.miVariable$.subscribe(() => { this.getSalidaTransferencia(); console.log("klk mi loco");
    //});
    
    this.getSalidaTransferencia();
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe(() => {
    // });
    // this.hearingTransferChanges()
  }

  // hearingTransferChanges(){
  //   this.transferCom.transferChange.subscribe(()=>{
  //     this.getSalidaTransferencia()
  //   })
  // }

  toggleSubmenu() {
    this.submenu = !this.submenu
    if (this.submenu) {
      this.submenuConfig = false;
    }
  }

  toggleSubmenuConfig() {
    this.submenuConfig = !this.submenuConfig
    if (this.submenuConfig) {
      this.submenu = false;
    }
  }

  toggleSubmenuEntrada() {
    this.submenuEntrada = !this.submenuEntrada
    if (this.submenuEntrada) this.submenuSalida = false;
    if (this.submenuEntrada) this.submenuProductos = false;
  }

  toggleSubmenuSalida() {
    this.submenuSalida = !this.submenuSalida
    if (this.submenuSalida) this.submenuEntrada = false;
    if (this.submenuSalida) this.submenuProductos = false;
  }

  toggleSubmenuProductos() {
    this.submenuProductos = !this.submenuProductos
    if (this.submenuProductos) this.submenuSalida = false;
    if (this.submenuProductos) this.submenuEntrada = false;
  }



  getSalidaTransferencia() {

    this.apiSalida.getSalidaTransferencia(this.url, this.token, 1)
      .pipe(
        catchError((error) => {
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        let proceso = []

        res.data.map((detalle: any) => {
          if (detalle.estado == 'EN PROCESO') {
            proceso.push(detalle)
            this.dataFiltered = proceso.length
          }
        })
      });
  }

  async logOut() {

    let closeAccount: boolean = await alertLogOut()

    if (closeAccount) {

      console.log(this.token);

      this.api.logOut(this.url, this.token)
        .pipe(
          catchError((error) => {
            alertServerDown();
            return throwError(error);
          })
        ).subscribe((res: any) => {
          console.log(res);
        })

      this.local.removeDataLocalStorage('token')
      this.local.removeDataLocalStorage('userData')

      //this.store.dispatch(App({ app: inicialState }))
      this.router.navigate(['/login'])
      this.api.IsLoggedIn(false)
    }
  }

  changePassword() {
    this.dialog.open(ChangePasswordComponent)
  }
}
