import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { catchError, throwError } from 'rxjs';
import { alertBackMessage, alertIsSuccess, alertNoValidForm, alertServerDown, loading, unableEmail, unablePasswordLength } from 'src/app/admin/Helpers/alertsFunctions';
import { UserService } from 'src/app/admin/Services/Configuracion/usuarios.service';
import { GET, persona, recinto, rol } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  generalITBIS: boolean = true;
  formUser: FormGroup;
  url!: string;
  token!: string
  seePass: string = 'password'

  rolesList: rol[] = []
  recintoList: recinto[] = []
  supInmediatoList: persona[] = []
  supervisorIdMap: { [displayValue: string]: number } = {};

  constructor(
    public fb: FormBuilder,
    private api: UserService,
    private store: Store<{ app: AppState }>
  ) {
    this.formUser = this.fb.group({
      idRol: new FormControl('', Validators.required),
      idRecinto: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      cargo: new FormControl('', Validators.required),
      supervisorInmediato: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
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
    this.getPersona()
  }

  itbisOption(event: any) {
    this.generalITBIS = event.value;
  }

  getRol() {
    this.api.getRol(this.url, this.token)
      .pipe(
        catchError((error) => {
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        if (res.data !== null) {
          
          res.data.map((rol:any)=>{
            if (rol.idRol != 2) {
              this.rolesList.push(rol)
            }
          })
        }
      })
  }

  getRecinto() {
    this.api.getRecinto(this.url, this.token)
      .pipe(
        catchError((error) => {
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        if (res !== null) {
          this.recintoList = res.data
        }
      })
  }

  getPersona() {
    this.api.getPerson(this.url, this.token, 1, 400)
      .pipe(
        catchError((error) => {
          alertServerDown();
          return throwError(error);
        })
      )
      .subscribe((res: any) => {
        if (res !== null) {
          let options = res.data

          options.forEach((item: any) => {
            this.supInmediatoList.push(item)
            this.supervisorIdMap[`${item.nombre} ${item.apellido}`] = item.id;
          });

        }
      })
  }

  // findSupInmediatoByName() {
  //   if (this.formUser.value.supervisorInmediato.length >= 4) {

  //     this.api.getPersonByName(this.url, this.token, 1, 10, this.formUser.value.supervisorInmediato)
  //       .pipe(
  //         catchError((error) => {
  //           alertServerDown();
  //           return error;
  //         })
  //       )
  //       .subscribe((res: any) => {
          
  //         let options = res.data
  //         this.supInmediatoList = []

  //         options.forEach((item: any) => {
  //           this.supInmediatoList.push(item)
  //           this.supervisorIdMap[`${item.nombre} ${item.apellido}`] = item.id;
  //         });
  //       })
  //   }
  // }

  seePassword() {
    if (this.seePass == 'password') {
      this.seePass = 'text'
    } else {
      this.seePass = 'password'
    }
  }

  sendData() {
    if (this.formUser.valid) {
      if (this.formUser.get('correo')?.valid) {
        if (this.formUser.value.contrasena.length >= 6) {

          let id = this.rolesList.filter(item => item.descripcion === this.formUser.value.idRol)
          let recinto = this.recintoList.filter(item => item.nombre === this.formUser.value.idRecinto)
          let selectedId = this.supervisorIdMap[this.formUser.value.supervisorInmediato];

          this.formUser.value.supervisorInmediato = selectedId
          this.formUser.value.idRecinto = recinto[0].idRecinto
          this.formUser.value.idRol = id[0].idRol

          loading(true)

          this.api.postUser(this.url, this.formUser.value, this.token)
            .pipe(
              catchError((error) => {
                loading(false)
                alertServerDown();
                return throwError(error);
              })
            )
            .subscribe((res: any) => {
              
              loading(false)
              if (res.data !== null) { alertIsSuccess(true); this.formUser.reset() }
              else if(res.message == 'Este email ya existe.'){alertBackMessage(res.message)}
              else alertIsSuccess(false)
            })

        } else {
          unablePasswordLength()
        }
      } else {
        unableEmail()
      }
    } else {
      alertNoValidForm()
    }
  }
}
