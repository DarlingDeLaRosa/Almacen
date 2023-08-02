import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { alertLogOut } from '../../Helpers/alertsFunctions';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-almacen-admin-app',
  templateUrl: './almacen-admin-app.component.html',
  styleUrls: ['./almacen-admin-app.component.css']
})
export class AlmacenAdminAppComponent {

  sidenavOpened: boolean = false;
  userName$ = this.store.select(state => state.app.user.nombre)
  userEmail$ = this.store.select(state => state.app.user.correo)
  userPosition$ = this.store.select(state => state.app.user.cargo)
  recinto$ = this.store.select(state => state.app.user.recinto.nombre)

  submenu: boolean = false;
  submenuConfig:  boolean = false;

  constructor(
    private store: Store< {app: AppState}>,
    private local: LocalStorageService,
    private api: AuthService,
    private router: Router,
    ){}

  toggleSubmenu(){
    this.submenu = !this.submenu
    if(this.submenu){
      this.submenuConfig = false;
    }
  }

  toggleSubmenuConfig(){
    this.submenuConfig = !this.submenuConfig
    if(this.submenuConfig){
      this.submenu = false;
    }
  }

  async logOut(){

    let closeAccount: boolean = await alertLogOut()
    if(closeAccount){
      this.local.removeDataLocalStorage('token')
      this.local.removeDataLocalStorage('userData')

      this.api.IsLoggedIn(false)

      this.router.navigate(['/login'])
    }
  }
}
