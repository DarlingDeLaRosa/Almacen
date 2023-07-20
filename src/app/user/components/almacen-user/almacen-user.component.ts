import { Component } from '@angular/core';

@Component({
  selector: 'app-almacen-user',
  templateUrl: './almacen-user.component.html',
  styleUrls: ['./almacen-user.component.css']
})
export class AlmacenUserComponent {
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
