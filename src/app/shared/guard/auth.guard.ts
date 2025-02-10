import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router)
  if(!!localStorage.getItem('token')){
    return true;
  }
  else{
    localStorage.setItem('redirectUrl',state.url);
    router.navigateByUrl('login');
    return false;
  }
};
