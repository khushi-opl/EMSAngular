import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{
  constructor(private router:Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/login') || req.url.includes('/user/sendLink/') || req.url.includes('/user/forgotPassword/')) {
      return next.handle(req);
    }
    const token = localStorage.getItem('token');
    
    if (token) {
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(clonedReq).pipe(
        catchError(this.handleError.bind(this)) 
      );
    }
    return next.handle(req);
  }
  private handleError(error: HttpErrorResponse) {

    if (error.status === 401) {
      console.error('Unauthorized access, please log in again');
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.router.navigate(['/login']); 
    }

    return throwError(error); 
  }
}
