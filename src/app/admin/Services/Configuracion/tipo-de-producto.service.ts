import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { postTipoProducto, tipoProducto } from '../../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TipoDeProductoService {

  cantidadItems = 15
  constructor(private http: HttpClient) { }

  public getTipoProducto(url: string, token: string, page: number) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoProductoHeader = {headers: headers}

    const getTipoProducto = `${url}/TipoArticulo?page=${page}&CantItems=${this.cantidadItems}`
    return this.http.get(getTipoProducto, tipoProductoHeader)
  }

  public filterTipoProducto(url: string, token: string, page: number, data: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoProductoHeader = {headers: headers}

    const getTipoProducto = `${url}/TipoArticulo/getbyname?name=${data}&page=${page}&CantItems=${this.cantidadItems}`
    return this.http.get(getTipoProducto, tipoProductoHeader)
  }

  public postTipoProducto(url: string, data: postTipoProducto, token: string) {

    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoProductoHeader = {headers: headers}

    const postTipoProducto = `${url}/TipoArticulo`
    return this.http.post(postTipoProducto, data, tipoProductoHeader)
  }

  public editTipoProducto(url: string, data: tipoProducto, token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoProductoHeader = {headers: headers}

    const editTipoProducto = `${url}/TipoArticulo`
    return this.http.put(editTipoProducto, data, tipoProductoHeader)
  }

  public removeTipoProducto(url: string, id: number, token: string) {

    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoProductoHeader = {headers: headers}

    const removeTipoProducto = `${url}/TipoArticulo/${id}`
    return this.http.delete(removeTipoProducto, tipoProductoHeader)
  }
}
