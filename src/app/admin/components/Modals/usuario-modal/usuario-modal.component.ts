import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { alertIsSuccess, alertSameData, alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';
import { UserService } from 'src/app/admin/Services/Configuracion/usuarios.service';
import { GET, putUser, rol } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-usuario-modal',
  templateUrl: './usuario-modal.component.html',
  styleUrls: ['./usuario-modal.component.css']
})
export class UsuarioModalComponent implements OnInit {
  formEditUser: FormGroup;
  url!: string;
  token!: string
  roles: rol[] = []

  constructor(
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public item: putUser,
    private api: UserService,
    private dialogRef: MatDialogRef<UsuarioModalComponent>,
    private store: Store<{ app: AppState }>
  ) {
    this.formEditUser = this.fb.group({
      idUsuario: 0,
      idRol: new FormControl('', Validators.required),
      idRecinto: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      cargo: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      contrasena: new FormControl('', Validators.required),
      cedula: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      ext: new FormControl('', Validators.required),
      celular: new FormControl('', Validators.required),
      supervisorInmediato: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
    this.getRol()

    this.formEditUser.setValue({
      idUsuario: this.item.idUsuario,
      idRol: `${this.item.idRol}`,
      idRecinto: `${this.item.idRecinto}`,
      nombre: `${this.item.usuario1}`,
      apellido: `${this.item.apellido}`,
      cargo: `${this.item.cargo}`,
      correo: `${this.item.correo}`,
      contrasena: `${this.item.contrasena}`,
      cedula: `${this.item.cedula}`,
      telefono: `${this.item.telefono}`,
      ext: `${this.item.ext}`,
      celular: `${this.item.celular}`,
      supervisorInmediato: `${this.item.supervisorInmediato}`,
    })

    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
  }

  closeModal() {
    this.dialogRef.close()
  }

  getRol(){
    this.api.getRol(this.url, this.token)
    .subscribe((res: any)=> {
      this.roles = res
    })
  }

  editData() {

    if (this.formEditUser.valid) {
      if (
        this.formEditUser.value.idRol !== this.item.idRol ||
        this.formEditUser.value.idRecinto !== this.item.idRecinto ||
        this.formEditUser.value.usuario1 !== this.item.usuario1 ||
        this.formEditUser.value.nombre !== this.item.nombre ||
        this.formEditUser.value.apellido !== this.item.apellido ||
        this.formEditUser.value.cargo !== this.item.cargo ||
        this.formEditUser.value.correo !== this.item.correo ||
        this.formEditUser.value.contrasena !== this.item.contrasena ||
        this.formEditUser.value.cedula !== this.item.cedula ||
        this.formEditUser.value.telefono !== this.item.telefono ||
        this.formEditUser.value.ext !== this.item.ext ||
        this.formEditUser.value.celular !== this.item.celular ||
        this.formEditUser.value.supervisorInmediato !== this.item.supervisorInmediato
        ) {

        this.api.editUser(this.url, this.formEditUser.value, this.token)
          .subscribe((res: any) => {

            let dataUser = res;

            if (dataUser.success) {
              alertIsSuccess(true)
              this.closeModal();
            } else {
              alertIsSuccess(false)
              this.closeModal();
            }
            () => {
              alertServerDown();
            }
          })

      } else {
        alertSameData()
        this.closeModal();
      }
    }
  }
}
