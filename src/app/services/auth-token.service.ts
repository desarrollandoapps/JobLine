import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tokenName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  API_ENDPOINT = 'http://joblinefree.com:98/api/Login/AuthWeb';

  constructor(private httpClient: HttpClient) { 
    console.log(localStorage.getItem('token'));
  }

  getToken(): string {
    var token: string;
    localStorage.setItem('In', 'in');
    this.httpClient.post(this.API_ENDPOINT, null, {responseType: 'text'}).subscribe(
      (val) => {
          console.log("POST llamado exitosamente", val);
          token = val;
          localStorage.setItem('token', token);
          var fecha = new Date();
          localStorage.setItem('fecha', fecha.getFullYear() + '/' + (fecha.getMonth()+1) + '/' + fecha.getDate());
          localStorage.removeItem('In');
      },
      response => {
          console.log("Respuesta", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      }
    );
    return token;
  }

}
