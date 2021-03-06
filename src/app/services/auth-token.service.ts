import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tokenName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  API_ENDPOINT = 'http://35.224.231.248:98/api/Login/AuthWeb';

  constructor(private httpClient: HttpClient) { 
    // console.log(localStorage.getItem('token'));
    if (!localStorage.getItem('token')) {
      localStorage.removeItem('In');
    }
  }

  getToken(): string {
    var token: string;
    localStorage.setItem('In', 'in');
    this.httpClient.post(this.API_ENDPOINT, null, {responseType: 'text'}).subscribe(
      (val) => {
          // console.log("POST llamado exitosamente", val);
          token = val;
          localStorage.setItem('token', token);
          var fecha = new Date();
          localStorage.setItem('fecha', fecha.getFullYear() + '/' + (fecha.getMonth()+1) + '/' + fecha.getDate());
          localStorage.removeItem('In');
      },
      response => {
          console.log("Respuesta", response);
      }
    );
    return token;
  }

}
