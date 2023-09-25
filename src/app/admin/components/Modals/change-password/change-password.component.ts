import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs';
import { alertIsSuccess, alertServerDown, loading } from 'src/app/admin/Helpers/alertsFunctions';
import { UserService } from 'src/app/admin/Services/Configuracion/usuarios.service';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  formChangePassword: FormGroup;
  url!: string;
  token!: string
  seePass: string = 'password'
  seepassnew: string = 'password'
  seepassConfirm :string = 'password'

  constructor(
    public fb: FormBuilder,
    private api: UserService,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private store: Store<{ app: AppState }>

  ) {
    this.formChangePassword = this.fb.group({
      claveActual: new FormControl('', Validators.required),
      nuevaClave: new FormControl('', Validators.required),
      confirmarNuevaClave: new FormControl('', Validators.required),
    })
  }

  ngOnInit() {
    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
  }

  seePassword() {
    if (this.seePass == 'password') {
      this.seePass = 'text'
    } else {
      this.seePass = 'password'
    }
  }

  seePasswordNew() {
    if (this.seepassnew == 'password') {
      this.seepassnew = 'text'
    } else {
      this.seepassnew = 'password'
    }
  }

  seePasswordConfirm() {
    if (this.seepassConfirm == 'password') {
      this.seepassConfirm = 'text'
    } else {
      this.seepassConfirm = 'password'
    }
  }

  closeModal() {
    this.dialogRef.close()
  }

  editData() {

    if (this.formChangePassword.valid) {
      loading(true)
      this.api.changePassword(this.url, this.formChangePassword.value, this.token)
        .pipe(
          catchError((error) => {
            loading(false)
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {
          loading(false)
          
          if (res.success) { alertIsSuccess(true); this.closeModal();} 
          else { alertIsSuccess(false); this.closeModal();}
        })

    }

  }
}
