import { Portal } from '@angular/cdk/portal';
import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, map, startWith } from 'rxjs';
import { alertIsSuccess, alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';
import { proveedorService } from 'src/app/admin/Services/proveedor.service';
import { GET } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  formProveedor: FormGroup;
  url!: string;
  token!: string
  filterOptions: any = []

  constructor(
    public fb: FormBuilder,
    private api: proveedorService,
    private store: Store<{ app: AppState }>
  ) {
    this.formProveedor = this.fb.group({
      rnc: new FormControl('', Validators.required),
      razonSocial: new FormControl('', [Validators.required]),
      nombreComercial: new FormControl('', Validators.required),
      representante: new FormControl('', Validators.required),
      telRepresentante: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
  }

  findByName() {
    if (this.formProveedor.value.razonSocial.length >= 5) {

      this.api.findProveedorByRS(this.url, this.token, this.formProveedor.value.razonSocial)
        .subscribe((res: any) => {
          let options = res.data
          this.filterOptions = []
          options.forEach((item: any) => {
            this.filterOptions.push(item)
          });
        })
    } else { }
  }

  findByRNC() {
    if (this.formProveedor.value.rnc.valid) {

      this.api.findProveedorByRS(this.url, this.token, this.formProveedor.value.rnc)
        .subscribe((res: any) => {
          this.filterOptions = res
        })
    } else { }
  }

  setValueFormProveedores(proveedor: any) {
    let setValuesform = this.filterOptions.filter((proveedorEspecifico: any) => {
      return proveedorEspecifico.razonSocial == proveedor
    });

    this.formProveedor.patchValue({
      rnc: setValuesform[0].rnc,
      nombreComercial: setValuesform[0].nombreComercial,
    })
  }

  sendData() {
    let dataTipoSalida: GET = { data: [], message: '', success: false, cantItem: 0, cantPage: 0, currentPage: 0 };

    console.log(this.formProveedor.valid)
    console.log(this.formProveedor.value)

    if (this.formProveedor.valid) {

      this.api.postProveedor(this.url, this.formProveedor.value, this.token)
        .subscribe((res: any) => {
          console.log(res)
          dataTipoSalida = res

          if (dataTipoSalida.success) {
            alertIsSuccess(true)
            this.formProveedor.reset()
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
