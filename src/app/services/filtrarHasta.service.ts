import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltrarServiceHasta {

  private broadcastMessage = new BehaviorSubject<string>( '' );
  broadcast = this.broadcastMessage.asObservable();

  constructor() { }

  updateBroadcastMessage(nuevoMensaje: string)
  {
    this.broadcastMessage.next(nuevoMensaje);
  }
}
