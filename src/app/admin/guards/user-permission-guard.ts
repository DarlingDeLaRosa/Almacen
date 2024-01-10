import { inject } from '@angular/core';
import { CanActivateFn} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

export const userPermissionGuard: CanActivateFn = (route, state) => {

    const rol = inject(AuthService)
    rol.checkIsLoggedIn()

    if (rol.idRol == 1) return true 
    else return false
};