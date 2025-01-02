import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../Serivces/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authenticationServices= Inject(AuthenticationService);

  if (localStorage.getItem("token")) { // Make sure to call isUserLogged() as a function
    console.log('User is logged in');
    return true;
  } else {
    console.log('User is not logged in');
    router.navigateByUrl('/login');
    return false;
  }
  
  
};
