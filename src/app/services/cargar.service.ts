import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargarService {

  private cargarMessage = new BehaviorSubject<boolean>(true);
  cargar = this.cargarMessage.asObservable();
  
  constructor() { }

  updateCargarMessage(nuevoMensaje: boolean) 
  {
    this.cargarMessage.next(nuevoMensaje);
  }

  getCargar()
  {
    return this.cargar;
  }
}
