import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService)
  const router = inject(Router)

  auth.checkIsLoggedIn()

  if(auth.LoggedIn){
    return true
  }else{
    router.navigate(['/login'])
    return false
  }
};

export const authGuardBackToLogIn: CanActivateFn = (route, state) => {

  const auth = inject(AuthService)
  const router = inject(Router)

  auth.checkIsLoggedIn()

  if(auth.LoggedIn){
    router.navigate(['/almacen/inicio'])
    return false
  }else{
    return true
  }
};


