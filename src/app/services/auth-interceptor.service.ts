import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  token: string;

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.token = localStorage.getItem('token');

    if ( localStorage.getItem('token') === null ) {
      return next.handle(req);
    }
    else {
      const headers: HttpHeaders = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token,
      })

      const reqClone = req.clone({
        headers: headers
      })      
      
      return next.handle(reqClone);
    }
  }
}
