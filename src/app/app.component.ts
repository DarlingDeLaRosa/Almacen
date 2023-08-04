import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/state';
import { Path, logIn } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'almacen';

  constructor(private store: Store<{app: AppState}>){}

  ngOnInit(): void {
    const path = 'http://172.25.4.24:81'
    const userData = localStorage.getItem('userData')

    this.store.dispatch(Path({path}))

    if(userData !== null){
      let dataParse = JSON.parse(userData)
      this.store.dispatch(logIn({user: dataParse }))
    }

  }
}
