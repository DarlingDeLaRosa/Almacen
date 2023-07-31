import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userAccount } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public logIn(url: string, data: userAccount) {
    const getUser = `${url}/Usuario/login`
    return this.http.post(getUser, data)
  }

}
