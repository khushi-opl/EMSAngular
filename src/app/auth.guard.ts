import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from './storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const lstorage=inject(StorageService)
  let token=lstorage.getCredentials('token')
  const router=inject(Router)
  if(token==null){

    router.navigate(['/login'])
    return false;
  }
  return true;
};
