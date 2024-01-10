import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// export const roleSuperAdminGuard: CanActivateFn = (route, state) => {

//   const auth = inject(AuthService)
//   const router = inject(Router)

//   auth.checkIsLoggedIn()

//   if(auth.idRol === 1){
//     return true
//   }else if(auth.idRol === 2){
//     //router.navigate(['/user-almacen/inicio'])
//     return false
//   }else if(auth.idRol === 3){
//     router.navigate(['/user-almacen/inicio'])
//     return false
//   }else{
//     return false
//   }
// };

// export const roleUserGuard: CanActivateFn = (route, state) => {

//   const auth = inject(AuthService)
//   const router = inject(Router)

//   auth.checkIsLoggedIn()

//   if(auth.idRol === 3){
//     return true
//   }else if(auth.idRol === 2){
//     //router.navigate(['/user-almacen/inicio'])
//     return false
//   }else if(auth.idRol === 1){
//     router.navigate(['/almacen/inicio'])
//     return false
//   }else{
//     return false
//   }
// };
