import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthTokenService } from './auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  token: string;

  constructor(private authTokenService: AuthTokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.token = localStorage.getItem('token');
    
    if ( localStorage.getItem('token') === null && !localStorage.getItem('In') ) 
    {
      this.authTokenService.getToken();
    }

    if (localStorage.getItem('fecha'))
    {
      var fechaToken = new Date(localStorage.getItem('fecha'));
      var fechaTokenUTC = Date.UTC(fechaToken.getFullYear(), fechaToken.getMonth(), fechaToken.getDay());
      var fechaActual = new Date();
      var fechaActualUTC = Date.UTC(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDay());

      const MILISENGUNDOS_POR_DIA = 1000 * 60 * 60 * 24;
      var dias = Math.floor((fechaActualUTC - fechaTokenUTC) / MILISENGUNDOS_POR_DIA);

      if (dias > 0)
      {
        // localStorage.clear()
        localStorage.removeItem('In')
        localStorage.removeItem('token')
        localStorage.removeItem('fecha')
        localStorage.setItem('cargar', 'si')
        location.reload()
      }
      
      
    }

    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    const reqClone = req.clone({
      headers: headers
    });     
    
    return next.handle(reqClone);
    
  }



}
