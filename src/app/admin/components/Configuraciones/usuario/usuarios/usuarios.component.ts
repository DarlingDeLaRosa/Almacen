import {Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { alertIsSuccess, alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';
import { UserService } from 'src/app/admin/Services/Configuracion/usuarios.service';
import { GET, recinto, rol } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit{
  generalITBIS: boolean = true;
  formUser: FormGroup;
  url!: string;
  token!: string
  roles: rol[] = []
  recinto: recinto[] = []

  constructor(
    public fb: FormBuilder,
    private api: UserService,
    private store: Store<{ app: AppState }>
  ) {
    this.formUser = this.fb.group({
      idRol: new FormControl('', Validators.required),
      usuario1: '',
      idRecinto: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      cargo: new FormControl('', Validators.required),
      supervisorInmediato: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      constrasena: new FormControl('', Validators.required),
      cedula: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      ext: new FormControl('', Validators.required),
      celular: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });

    this.getRol();
    this.getRecinto();
  }

  itbisOption(event : any){
    this.generalITBIS = event.value;
  }

  getRol(){
    this.api.getRol(this.url, this.token)
    .subscribe((res: any)=> {
      if(res){
        this.roles = res.data
      }
    })
  }

  getRecinto(){
    this.api.getRecinto(this.url, this.token)
    .subscribe((res: any)=> {
      if(res){
        this.recinto = res.data
      }
    })
  }

  sendData() {
    let dataUser: GET = { data: [], message: '', success: false, cantItem: 0, cantPage: 0, currentPage: 0 };

    if (this.formUser.valid) {

      this.api.postUser(this.url, this.formUser.value, this.token)
        .subscribe((res: any) => {

          dataUser = res

          if (dataUser.success) {
            alertIsSuccess(true)
            this.formUser.reset()
          } else {
            alertIsSuccess(false)
          }
          () => {
            alertServerDown();
          }
        })

    }
  }

}
