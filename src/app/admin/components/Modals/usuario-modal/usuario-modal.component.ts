import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { alertIsSuccess, alertSameData, alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';
import { UserService } from 'src/app/admin/Services/Configuracion/usuarios.service';
import { persona, recinto, rol } from 'src/app/admin/models/interfaces';
import { AppState, User } from 'src/app/store/state';

@Component({
  selector: 'app-usuario-modal',
  templateUrl: './usuario-modal.component.html',
  styleUrls: ['./usuario-modal.component.css']
})
export class UsuarioModalComponent implements OnInit {
  formEditUser: FormGroup;
  url!: string;
  token!: string
  rolesList: rol[] = []
  recintoList: recinto[] = []
  supInmediatoList: persona[] = []
  supervisorIdMap: { [displayValue: string]: number } = {};


  constructor(
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public item: User,
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
      supervisorInmediato: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      cedula: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      ext: new FormControl('', Validators.required),
      celular: new FormControl('', Validators.required),
    })
  }

  ngOnInit() {
    this.formEditUser.setValue({
      idUsuario: this.item.idUsuario,
      idRol: `${this.item.role.descripcion}`,
      idRecinto: `${this.item.recinto.nombre}`,
      nombre: `${this.item.nombre}`,
      apellido: `${this.item.apellido}`,
      cargo: `${this.item.cargo}`,
      correo: `${this.item.correo}`,
      cedula: `${this.item.cedula}`,
      telefono: `${this.item.telefono}`,
      ext: `${this.item.ext}`,
      celular: `${this.item.celular}`,
      supervisorInmediato: `${this.item.supervisor.nombre}`,
    })

    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });

    this.getRol();
    this.getRecinto();
  }

  closeModal() {
    this.dialogRef.close()
  }

  getRol() {
    this.api.getRol(this.url, this.token)
      .subscribe((res: any) => {
        if (res) {
          this.rolesList = res.data
        }
      })
  }

  getRecinto() {
    this.api.getRecinto(this.url, this.token)
      .subscribe((res: any) => {
        if (res) {
          this.recintoList = res.data
        }
      })
  }

  findSupInmediatoByName() {
    if (this.formEditUser.value.supervisorInmediato.length >= 4) {

      this.api.getPersonByName(this.url, this.token, 1, 10, this.formEditUser.value.supervisorInmediato)
        .subscribe((res: any) => {
          let options = res.data
          this.supInmediatoList = []
          options.forEach((item: any) => {

            this.supInmediatoList.push(item)
            this.supervisorIdMap[`${item.nombre} ${item.apellido}`] = item.id;

          });
        })
    }
  }

  editData() {
    let id = this.rolesList.filter(item => item.descripcion === this.formEditUser.value.idRol)
    let recinto = this.recintoList.filter(item => item.nombre === this.formEditUser.value.idRecinto)
    let selectedId = this.supervisorIdMap[this.formEditUser.value.supervisorInmediato];

    console.log(selectedId)
    this.formEditUser.value.supervisorInmediato = selectedId
    this.formEditUser.value.idRecinto = recinto[0].idRecinto
    this.formEditUser.value.idRol = id[0].idRol

    console.log(this.formEditUser.value)
    let hola = JSON.stringify(this.formEditUser.value)
    console.log(hola)

    if (this.formEditUser.valid) {
      if (
        this.formEditUser.value.idRol !== this.item.role.descripcion ||
        this.formEditUser.value.idRecinto !== this.item.recinto.nombre ||
        this.formEditUser.value.nombre !== this.item.nombre ||
        this.formEditUser.value.apellido !== this.item.apellido ||
        this.formEditUser.value.cargo !== this.item.cargo ||
        this.formEditUser.value.correo !== this.item.correo ||
        this.formEditUser.value.cedula !== this.item.cedula ||
        this.formEditUser.value.telefono !== this.item.telefono ||
        this.formEditUser.value.ext !== this.item.ext ||
        this.formEditUser.value.celular !== this.item.celular ||
        this.formEditUser.value.supervisorInmediato !== this.item.supervisor
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
