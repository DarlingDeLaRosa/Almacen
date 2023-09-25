import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { postTipoEntrada, tipoEntrada } from '../../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TipoDeEntradaService {

  cantidadItems = 15
  constructor(private http: HttpClient) { }

  public getTipoEntrada(url: string, token: string, page: number,  noPage:number) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoEntradaHeader = {headers: headers}

    const getTipoEntrada = `${url}/TipoEntrada?page=${page}&CantItems=${noPage}`
    return this.http.get(getTipoEntrada, tipoEntradaHeader)
  }

  public filterTipoEntrada(url: string, token: string, page: number, data: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoEntradaHeader = {headers: headers}

    const getTipoEntrada = `${url}/TipoEntrada/getbyname?name=${data}&page=${page}&CantItems=${this.cantidadItems}`
    return this.http.get(getTipoEntrada, tipoEntradaHeader)
  }

  public postTipoEntrada(url: string, data: postTipoEntrada, token: string) {

    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoEntradaHeader = {headers: headers}

    const postTipoEntrada = `${url}/TipoEntrada`
    return this.http.post(postTipoEntrada, data, tipoEntradaHeader)
  }

  public editTipoEntrada(url: string, data: tipoEntrada, token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoEntradaHeader = {headers: headers}

    const editTipoEntrada = `${url}/TipoEntrada`
    return this.http.put(editTipoEntrada, data, tipoEntradaHeader)
  }

  public removeTipoEntrada(url: string, id: number, token: string) {

    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoEntradaHeader = {headers: headers}

    const removeTipoEntrada = `${url}/TipoEntrada/${id}`
    return this.http.delete(removeTipoEntrada, tipoEntradaHeader)
  }
}
