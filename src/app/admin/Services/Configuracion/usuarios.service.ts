import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { postUser } from '../../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  cantidadItems = 15
  constructor(private http: HttpClient) { }

  //Obtener Persona

  public getPersonByName(url: string, token: string, page: number, cantItem: number, name: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const personHeader = {headers: headers}

    const getPerson = `${url}/Persona/getbyname?name=${name}&page=${page}&CantItems=${cantItem}`
    return this.http.get(getPerson, personHeader)
  }

  //Obtener Rol

  public getRol(url: string, token: string,) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const rolHeader = {headers: headers}

    const getRol = `${url}/Rol`
    return this.http.get(getRol, rolHeader)
  }

  //Obtener Recinto

  public getRecinto(url: string, token: string,) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const recintoHeader = {headers: headers}

    const getRecinto = `${url}/Recinto`
    return this.http.get(getRecinto, recintoHeader)
  }

  public getUser(url: string, token: string, page: number) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const userHeader = {headers: headers}

    const getUser = `${url}/Usuario/${page}/${this.cantidadItems}`
    return this.http.get(getUser, userHeader)
  }

  public filterUser(url: string, token: string, page: number, data: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const userHeader = {headers: headers}

    const getUser = `${url}/Usuario/getbyname?name=${data}&page=${page}&CantItems=${this.cantidadItems}`
    return this.http.get(getUser, userHeader)
  }

  public postUser(url: string, data: postUser, token: string) {

    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const userHeader = {headers: headers}

    const postUser = `${url}/Usuario`
    return this.http.post(postUser, data, userHeader)
  }

  public editUser(url: string, data: postUser, token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const userHeader = {headers: headers}

    const editUser = `${url}/Usuario`
    return this.http.put(editUser, data, userHeader)
  }

  public removeUser(url: string, id: number, token: string) {

    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const userHeader = {headers: headers}

    const removeUser = `${url}/Usuario/${id}`
    return this.http.delete(removeUser, userHeader)
  }
}
