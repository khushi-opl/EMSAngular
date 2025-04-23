import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  setCredentials(key:string,value:string):void
  {
     return localStorage.setItem(key,value);
  }
  getCredentials(key:string):string | null
  {
   return localStorage.getItem(key);
  }
  clearcredentials(key:string):void
  {
    localStorage.removeItem(key);
  }
  setUserRole(role: string): void {
    localStorage.setItem('role', role);  
  }
  getUserRole(): string | null {
    return localStorage.getItem('role');
  }
}
