import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userAccount } from '../models/interfaces';
import { LocalStorageService } from './local-storage.service';
import { AppState } from '../store/state';
import { Store } from '@ngrx/store';
import { Token, logIn } from '../store/actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  LoggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private local: LocalStorageService,
    private store: Store<{ app: AppState }>,
    ) { }

  public logIn(url: string, data: userAccount) {
    const getUser = `${url}/Usuario/login`
    return this.http.post(getUser, data)
  }

  public checkIsLoggedIn() {

    let token = this.local.getDataLocalStorage('token')
    let userData = this.local.getDataLocalStorage('userData')

    if(token && userData){
      this.store.dispatch(logIn({ user: userData }))
      this.store.dispatch(Token({ token: token }))
      this.IsLoggedIn(true)
    }else{
      this.IsLoggedIn(false)
    }
  }

  IsLoggedIn(confirmation: boolean){
    this.LoggedIn  = confirmation;
  }
}
