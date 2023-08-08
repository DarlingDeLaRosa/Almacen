import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { postTipoAlmacen, tipoAlmacen } from '../../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TipoDeAlmacenService {

  cantidadItems = 15
  constructor(private http: HttpClient) { }

  public getTipoAlmacen(url: string, token: string, page: number) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoAlmacenHeader = {headers: headers}

    const getTipoAlmacen = `${url}/TipoAlmacen?page=${page}&CantItems=${this.cantidadItems}`
    return this.http.get(getTipoAlmacen, tipoAlmacenHeader)
  }

  public filterTipoAlmacen(url: string, token: string, page: number, data: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoAlmacenHeader = {headers: headers}

    const getTipoAlmacen = `${url}/TipoAlmacen/getbyname?name=${data}&page=${page}&CantItems=${this.cantidadItems}`
    return this.http.get(getTipoAlmacen, tipoAlmacenHeader)
  }

  public postTipoAlmacen(url: string, data: postTipoAlmacen, token: string) {

    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoAlmacenHeader = {headers: headers}

    const postTipoAlmacen = `${url}/TipoAlmacen`
    return this.http.post(postTipoAlmacen, data, tipoAlmacenHeader)
  }

  public editTipoAlmacen(url: string, data: tipoAlmacen, token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoAlmacenHeader = {headers: headers}

    const editTipoAlmacen = `${url}/TipoAlmacen`
    return this.http.put(editTipoAlmacen, data, tipoAlmacenHeader)
  }

  public removeTipoAlmacen(url: string, id: number, token: string) {

    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoAlmacenHeader = {headers: headers}

    const removeTipoAlmacen = `${url}/TipoAlmacen/${id}`
    return this.http.delete(removeTipoAlmacen, tipoAlmacenHeader)
  }
}
