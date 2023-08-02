import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveDataLocalStorage(key: string, data: any): void {
    const authUserData = JSON.stringify(data);
    localStorage.setItem(key, authUserData);
  }

  getDataLocalStorage(key: string ): any {
    const authUserData = localStorage.getItem(key);
    if(authUserData !==  null) return JSON.parse(authUserData);
  }

  removeDataLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }
}
