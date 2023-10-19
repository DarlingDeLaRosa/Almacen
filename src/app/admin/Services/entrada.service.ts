import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { detalleProductoEntrada, detallePutGroup, postEntrada, putEntrada } from '../models/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class entradaService {

  cantidadItems = 15
  //public miVariable$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  public getEntrada(url: string, token: string, page: number, itemPorPage: number) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const EntradaHeader = {headers: headers}

    const getEntrada = `${url}/Entrada?page=${page}&CantItems=${itemPorPage}`
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

    const getEntrada = `${url}/Entrada/getbyname?nombre=${data}&page=${page}&CantItems=${this.cantidadItems}`
    return this.http.get(getEntrada, EntradaHeader)
  }

  public getEntradaReport(url: string, token: string, page: number, desde: any , hasta: any, data: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const EntradaHeader = {headers: headers}

    const getEntrada = `${url}/Entrada/getbynamereport?nombre=${data}&desde=${desde}&hasta=${hasta}&page=${page}&CantItems=${this.cantidadItems}`
    return this.http.get(getEntrada, EntradaHeader)
  }

  public postEntrada(url: string, data: postEntrada, token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const EntradaHeader = {headers: headers}

    const postEntrada = `${url}/Entrada`
    return this.http.post(postEntrada, data, EntradaHeader)
  }

  public putEntrada(url: string, data: putEntrada, token: string) {
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

  public putDetalleEntrada(url: string, data: detallePutGroup[], token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const detalleEntradaHeader = {headers: headers}

    const editDetalleEntrada = `${url}/Entrada`
    return this.http.put(editDetalleEntrada, data, detalleEntradaHeader)
  }

  // Reporte de detalles de entrada

  public getAllDetalleEntrada(url: string, token: string, nombre: string, desde: any, hasta: any, page: number) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const EntradaDetalleHeader = {headers: headers}

    const getDetalleEntrada = `${url}/Entrada/getbynamedetailsreport?nombre=${nombre}&desde=${desde}&hasta=${hasta}&page=${page}&CantItems=${this.cantidadItems}`
    return this.http.get(getDetalleEntrada, EntradaDetalleHeader)
  }

  // Entrada automatica de transferencia

  public postTransferenciaEntrada(url: string, id: number, token: string) {
    
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const detalleEntradaHeader = {headers: headers}

    const postDetalleEntrada = `${url}/Entrada/addtrasferencia${id}`
    return this.http.post(postDetalleEntrada, '', detalleEntradaHeader)
  }

}
