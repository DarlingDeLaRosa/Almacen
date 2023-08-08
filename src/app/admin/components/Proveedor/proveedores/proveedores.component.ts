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
export class ProveedoresComponent implements OnInit{
  formProveedor: FormGroup;
  url!: string;
  token!: string
  filterOptions: string[] = []

  constructor(
    public fb: FormBuilder,
    private api: proveedorService,
    private store: Store<{ app: AppState }>
  ) {
    this.formProveedor = this.fb.group({
      rnc: new FormControl('', Validators.required),
      razonSocial: new FormControl('', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
      nombreComercial: new FormControl('', Validators.required),
      estadoProveedor: new FormControl('', Validators.required),
      representante: new FormControl('', Validators.required),
      telRepresentante: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    //console.log(this.formProveedor.value.razonSocial)
    //this.formProveedor.controls['razonSocial'].valueChanges.pipe(
    //  startWith(''),
    //  map(value => this._filter(value))
    //)
    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
  }

  findByName(){
    if (this.formProveedor.value.razonSocial.length >= 5) {

      this.api.findProveedorByRS(this.url, this.token, this.formProveedor.value.razonSocial)
      .subscribe((res: any)=> {
        let options = res.data
        this.filterOptions = []
        options.forEach((item: any) => {
          this.filterOptions.push(item.razonSocial)
          console.log(this.filterOptions)
        });
      })
    } else {}
  }

  findByRNC(){
    if (this.formProveedor.value.rnc.valid) {

      this.api.findProveedorByRS(this.url, this.token, this.formProveedor.value.rnc)
      .subscribe((res: any)=> {
        console.log(res)
        this.filterOptions = res
      })
    } else {}
  }
  //private _filter(value: string): any {
  //  console.log(value)
  //  const filterValue = value.toLowerCase();
  //  this.api.findProveedorByRS(this.url, this.token, filterValue)
  //  .subscribe((res: any)=>{
//
  //    res.filter((item: any) => {
  //      item.razonSocial.toLowercase().includes(filterValue)
  //    })
  //  })
  //}

  //displayFn(subject: any){
  //  return subject ? subject.name : undefined;
  //}

  sendData() {
    let dataTipoSalida: GET = { data: [], message: '', success: false, cantItem: 0, cantPage: 0, currentPage: 0 };

    if (this.formProveedor.valid) {

      this.api.postProveedor(this.url, this.formProveedor.value, this.token)
        .subscribe((res: any) => {

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
