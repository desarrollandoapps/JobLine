import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  API_ENDPOINT = 'http://joblinefree.com:98/api/Login/AuthWeb';

  constructor(private httpClient: HttpClient) { 
    console.log(localStorage.getItem('token'));
    var fecha = localStorage.getItem('fecha');
    if (localStorage.getItem('token') == null )
    {
      httpClient.post(this.API_ENDPOINT, null, {responseType: 'text'}).subscribe(
        (val) => {
            console.log("POST llamado exitosamente", 
                        val);
            localStorage.setItem('token', val);
            var fecha = new Date();
            localStorage.setItem('fecha', fecha.getFullYear()+'-' + (fecha.getMonth()+1) + '-'+fecha.getDate());
        },
        response => {
            console.log("Respuesta", response);
        },
        () => {
            console.log("The POST observable is now completed.");
        });
      }
    }

}
