import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/state';
import { Path, Token, logIn } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'almacen';

  constructor(private store: Store<{app: AppState}>){}

  ngOnInit(): void {

    let dev = 'http://172.25.4.24:81'
    let pro = 'https://sigebi.isfodosu.edu.do/sigebiapi'

    const path = dev
    
    const userData = localStorage.getItem('userData')
    const token = localStorage.getItem('token')

    this.store.dispatch(Path({path}))

    if(userData !== null){
      let dataParse = JSON.parse(userData)
      this.store.dispatch(logIn({user: dataParse }))
    }

    if(token !== null){
      let dataToken= JSON.parse(token)
      this.store.dispatch(Token({token: dataToken }))
    }
  }
}
