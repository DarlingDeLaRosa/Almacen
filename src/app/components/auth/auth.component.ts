import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { logIn } from 'src/app/store/actions';
import { AppState, User } from 'src/app/store/state';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  app$ = this.store.select((state)=> state.app.user)

  constructor(private store: Store<{app: AppState}>){}

  mirando(){
    const user: User = {rol: 'Dueño', name: 'Darling'}
    this.store.dispatch(logIn({user}))
  }

}
