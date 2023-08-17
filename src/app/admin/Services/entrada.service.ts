import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { detalleProductoEntrada, postEntrada, putEntrada } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class entradaService {

  cantidadItems = 15
  constructor(private http: HttpClient) { }

  public getEntrada(url: string, token: string, page: number) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const EntradaHeader = {headers: headers}

    const getEntrada = `${url}/Entrada?page=${page}&CantItems=${this.cantidadItems}`
    return this.http.get(getEntrada, EntradaHeader)
  }

  public getEntradaById(url: string, token: string, id:number) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const EntradaHeader = {headers: headers}

    const getEntrada = `${url}/Entrada/${id}`
    return this.http.get(getEntrada, EntradaHeader)
  }

  public filterEntrada(url: string, token: string, page: number, data: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const EntradaHeader = {headers: headers}

    const getEntrada = `${url}/Entrada/getbyname?name=${data}&page=${page}&CantItems=${this.cantidadItems}`
    return this.http.get(getEntrada, EntradaHeader)
  }

  public postEntrada(url: string, data: postEntrada, token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const EntradaHeader = {headers: headers}

    const postEntrada = `${url}/Entrada`
    return this.http.post(postEntrada, data, EntradaHeader)
  }

  public editEntrada(url: string, data: putEntrada, token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const EntradaHeader = {headers: headers}

    const editEntrada = `${url}/Entrada`
    return this.http.put(editEntrada, data, EntradaHeader)
  }

  public removeEntrada(url: string, id: number, token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const EntradaHeader = {headers: headers}

    const removeEntrada = `${url}/Entrada/${id}`
    return this.http.delete(removeEntrada, EntradaHeader)
  }

  // Detalles de Entrada

  public getDetalleEntrada(url: string, token: string, id: number) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const EntradaDetalleHeader = {headers: headers}

    const getDetalleEntrada = `${url}/Entrada/getdetalleentradabyid?id=${id}`
    return this.http.get(getDetalleEntrada, EntradaDetalleHeader)
  }

  public postDetalleEntrada(url: string, data: detalleProductoEntrada[], token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const detalleEntradaHeader = {headers: headers}

    const postDetalleEntrada = `${url}/Entrada/adddetalle`
    return this.http.post(postDetalleEntrada, data, detalleEntradaHeader)
  }

}
