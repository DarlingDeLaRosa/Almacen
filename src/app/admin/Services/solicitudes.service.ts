import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class solicitudesService {

  constructor(private http: HttpClient) { }

  public getSolicitudes(url: string, token: string, page: number, itemPorPage: number) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const SolcitudesHeader = {headers: headers}

    const getSolicitudes = `${url}/Solicitudes?Page=${page}&CantItem=${itemPorPage}`
    return this.http.get(getSolicitudes, SolcitudesHeader)
  }
}
