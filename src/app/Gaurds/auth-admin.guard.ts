import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const isAdminString = localStorage.getItem('isAdmin');
  const router = inject(Router);
  if (isAdminString !== null) {
      const isAdmin = JSON.parse(isAdminString);
        if(isAdmin){
          return true 
        }else {
          router.navigate(['/***'])
          // Handle the case where the item is not found in localStorage
          return false; // Or whatever default value you want to return
        }
  } else {
    router.navigate(['/***'])
      // Handle the case where the item is not found in localStorage
      return false; // Or whatever default value you want to return
  }
};
