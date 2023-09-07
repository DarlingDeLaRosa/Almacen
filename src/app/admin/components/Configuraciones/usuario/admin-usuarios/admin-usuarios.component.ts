import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioModalComponent } from '../../../Modals/usuario-modal/usuario-modal.component';
import { AppState, User } from 'src/app/store/state';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/admin/Services/Configuracion/usuarios.service';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { alertIsSuccess, alertRemoveSuccess, alertRemoveSure, alertServerDown, loading } from 'src/app/admin/Helpers/alertsFunctions';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css']
})
export class AdminUsuariosComponent implements OnInit{

  dataFiltered: User[] = []
  filterUser: FormGroup;
  url: string = ''
  noPage: number = 1
  token: string = ''
  pagina: number = 1
  loading: boolean = false;

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
    this.loading = true

    this.api.getUser(this.url, this.token, this.pagina,)
      .subscribe((res: any) => {

        this.loading = false

        console.log(res)
        this.noPage = res.cantPage
        this.dataFiltered = res.data

        ,() => {
          this.loading = false
          alertServerDown();
        }  
      });
  }

  dataFilter() {
    if (this.filterUser.value.filter.length >= 3) {

      this.api.filterUser(this.url, this.token, this.pagina, this.filterUser.value.filter)
      .subscribe((res: any)=> {
        this.noPage = res.cantPage
        this.dataFiltered = res.data

        ,() => {
          alertServerDown();
        }  
      })

    } else {
      this.getUser()
    }
  }

  openModal(item: User) {
    console.log(item)
    let dialogRef = this.dialog.open(UsuarioModalComponent, { data: item })

    dialogRef.afterClosed().subscribe(()=> {
      this.getUser()
    })
  }

  async removeAlert(item: number) {

    let removeChoise: boolean = await alertRemoveSure()

    if (removeChoise) {

      loading(true)
      
      this.api.removeUser(this.url, item, this.token)
        .subscribe((res: any) => {

          loading(false)

          if (res) {
            alertRemoveSuccess()
            this.getUser()
          } else {
            alertIsSuccess(false)
          }
          () => {
            loading(false)
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
