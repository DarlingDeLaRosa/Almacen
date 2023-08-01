import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { alerUserWrong, alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';
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

  constructor(public fb: FormBuilder, private api: AuthService, private store: Store<{ app: AppState }>, private router: Router) {
    this.formUserLogIn = this.fb.group({
      usuario: new FormControl('', Validators.required),
      contrasena: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.store.select(state => state.app.path).subscribe((path: string) => {
      this.url = path;
    });
  }

  logIn() {
    console.log(this.formUserLogIn.value)
    if (this.formUserLogIn.valid) {

      this.api.logIn(this.url, this.formUserLogIn.value)
        .subscribe((res: any) => {

          let userResponse: GETUser = res
          let userData: User = res.data

          if (userResponse.data !== null && userResponse.token !== null) {

            this.api.IsLoggedIn(true)

            //this.router.navigate(['/almacen/inicio'])

            this.store.dispatch(logIn({ user: userData }))
            this.store.dispatch(Token({ token: userResponse.token }))

            this.formUserLogIn.reset()
          } else {
            alerUserWrong()
            this.formUserLogIn.reset()
          }
          () => {
            alertServerDown();
          }
        })
    }
  }
}

