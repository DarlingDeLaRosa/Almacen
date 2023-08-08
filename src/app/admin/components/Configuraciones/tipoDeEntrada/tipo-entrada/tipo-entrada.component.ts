import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { alertIsSuccess, alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';
import { TipoDeEntradaService } from 'src/app/admin/Services/Configuracion/tipo-de-entrada.service';
import { GET } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-tipo-entrada',
  templateUrl: './tipo-entrada.component.html',
  styleUrls: ['./tipo-entrada.component.css']
})
export class TipoEntradaComponent implements OnInit{
  formTipoEntrada: FormGroup;
  url!: string;
  token!: string

  constructor(
    public fb: FormBuilder,
    private api: TipoDeEntradaService,
    private store: Store<{ app: AppState }>
    ){
    this.formTipoEntrada = this.fb.group({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
  }

  sendData() {
    let dataTipoEntrada: GET = { data: [], message: '', success: false, cantItem: 0, cantPage: 0, currentPage: 0 };

    if (this.formTipoEntrada.valid) {

      this.api.postTipoEntrada(this.url, this.formTipoEntrada.value, this.token)
        .subscribe((res: any) => {

          dataTipoEntrada = res

          if (dataTipoEntrada.success) {
            alertIsSuccess(true)
            this.formTipoEntrada.reset()
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
