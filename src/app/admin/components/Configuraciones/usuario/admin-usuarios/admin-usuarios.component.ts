import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalComponent } from '../../../Modals/product-modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UsuarioModalComponent } from '../../../Modals/usuario-modal/usuario-modal.component';
import { AppState, User } from 'src/app/store/state';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/admin/Services/Configuracion/usuarios.service';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { alertIsSuccess, alertRemoveSuccess, alertRemoveSure, alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css']
})
export class AdminUsuariosComponent implements OnInit{

  dataFiltered!: User[]
  filterUser: FormGroup;
  url: string = ''
  noPage: number = 1
  token: string = ''
  pagina: number = 1

  constructor(
    public dialog: MatDialog,
    private api: UserService,
    private store: Store<{ app: AppState }>
    ){
    this.filterUser = new FormGroup({
      filter: new FormControl(''),
    })
  }

  ngOnInit() {

    combineLatest([
      this.store.select(state => state.app.token),
      this.store.select(state => state.app.path)
    ]).subscribe(([tokenValue, pathValue]) => {

      this.url = pathValue;
      this.token = tokenValue;

      this.getUser()
    })
  }

  getUser() {
    this.api.getUser(this.url, this.token, this.pagina,)
      .subscribe((res: any) => {
        this.noPage = res.cantPage
        this.dataFiltered = res.data
      });
  }

  dataFilter() {
    if (this.filterUser.value.filter.length >= 3) {

      this.api.filterUser(this.url, this.token, this.pagina, this.filterUser.value.filter)
      .subscribe((res: any)=> {
        this.dataFiltered = res.data
      })

    } else {
      this.getUser()
    }
  }

  openModal(item: User) {
    let dialogRef = this.dialog.open(UsuarioModalComponent, { data: item })

    dialogRef.afterClosed().subscribe(()=> {
      this.getUser()
    })
  }

  async removeAlert(item: number) {

    let removeChoise: boolean = await alertRemoveSure()

    if (removeChoise) {
      this.api.removeUser(this.url, item, this.token)
        .subscribe((res: any) => {

          if (res) {
            alertRemoveSuccess()
            this.getUser()
          } else {
            alertIsSuccess(false)
          }
          () => {
            alertServerDown();
          }
        })
    }
  }

  nextPage(){
    if(this.pagina < this.noPage){
      this.pagina += 1
      this.getUser()
    }
  }

  previousPage(){
    if(this.pagina > 1){
      this.pagina -= 1
      this.getUser()
    }
  }
}
