import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-almacen-admin-app',
  templateUrl: './almacen-admin-app.component.html',
  styleUrls: ['./almacen-admin-app.component.css']
})
export class AlmacenAdminAppComponent {
  sidenavOpened: boolean = false;
  userName$ = this.store.select(state => state.app.user.nombre)

  submenu: boolean = false;
  submenuConfig:  boolean = false;

  constructor(private store: Store< {app: AppState}>){}

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
}
