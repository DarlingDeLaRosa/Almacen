import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs';
import { alertIsSuccess, alertNoValidForm, alertServerDown, loading } from 'src/app/admin/Helpers/alertsFunctions';
import { TipoDeAlmacenService } from 'src/app/admin/Services/Configuracion/tipo-de-almacen.service';
import { GET } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-tipo-almacen',
  templateUrl: './tipo-almacen.component.html',
  styleUrls: ['./tipo-almacen.component.css']
})
export class TipoAlmacenComponent {
  formTipoAlmacen: FormGroup;
  url!: string;
  token!: string

  constructor(
    public fb: FormBuilder,
    private api: TipoDeAlmacenService,
    private store: Store<{ app: AppState }>
  ) {
    this.formTipoAlmacen = this.fb.group({
      nombre: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
  }

  sendData() {
    if (this.formTipoAlmacen.valid) {
      loading(true)

      this.api.postTipoAlmacen(this.url, this.formTipoAlmacen.value, this.token)
        .pipe(
          catchError((error) => {
            loading(false)
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {
          loading(false)

          if (res.data !== null) { alertIsSuccess(true); this.formTipoAlmacen.reset() }
          else alertIsSuccess(false)
        })
    }else{
      alertNoValidForm()
    }
  }
}
