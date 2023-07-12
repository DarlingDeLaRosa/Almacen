import { Component } from '@angular/core';

@Component({
  selector: 'app-almacen-admin-app',
  templateUrl: './almacen-admin-app.component.html',
  styleUrls: ['./almacen-admin-app.component.css']
})
export class AlmacenAdminAppComponent {
  sidenavOpened: boolean = false;

  submenu: boolean = false;
  submenuConfig:  boolean = false;

  constructor(){}

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
