import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, throwError } from 'rxjs';
import { alerUserWrong, alertServerDown, loading } from 'src/app/admin/Helpers/alertsFunctions';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Token, logIn } from 'src/app/store/actions';
import { AppState, GETUser, User } from 'src/app/store/state';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  formUserLogIn: FormGroup;
  url!: string;
  disableBtn: boolean = false;
  seePass: string = 'password'

  constructor(
    public fb: FormBuilder,
    private api: AuthService,
    private store: Store<{ app: AppState }>,
    private router: Router,
    private localStore: LocalStorageService
  ) {
    this.formUserLogIn = this.fb.group({
      usuario: new FormControl('', Validators.required),
      contrasena: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path;});
  }

  seePassword() {
    if (this.seePass == 'password') {
      this.seePass = 'text'
    } else {
      this.seePass = 'password'
    }
  }

  logIn() {
    if (this.formUserLogIn.valid) {
      
      loading(true)
        this.api.logIn(this.url, this.formUserLogIn.value)
        .pipe(
          catchError((error)=>{
            loading(false)
            alertServerDown()
            return throwError(error)
          })
        )  
        .subscribe((res: any) => {
            loading(false)

            let userResponse: GETUser = res
            let userData: User = res.data
            
            if (userResponse.data !== null && userResponse.token !== null) {

              this.api.IsLoggedIn(true)
              this.api.IsAdminRole(userResponse.data.role.idRol)

              this.localStore.saveDataLocalStorage('token', userResponse.token)
              this.localStore.saveDataLocalStorage('userData', userData)

              this.store.dispatch(logIn({ user: userData }))
              this.store.dispatch(Token({ token: userResponse.token }))

              this.router.navigate(['/almacen/inicio'])
              // if (userResponse.data.role.idRol === 1) {
              //   loading(false)

              // } else if (userResponse.data.role.idRol === 2) {
              //   this.router.navigate(['/user-almacen/inicio'])

              // } else if (userResponse.data.role.idRol === 3) {
              //   loading(false)
              //   this.router.navigate(['/user-almacen/inicio'])
              //   this.router.navigate(['/almacen/inicio'])

              // } else {
              //   this.router.navigate(['/login'])
              // }

              this.formUserLogIn.reset()
            } else {
              alerUserWrong()
              //this.formUserLogIn.get('password')?.reset()
            }
            
          })

    }
  }
}

