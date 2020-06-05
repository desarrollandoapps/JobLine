import { Injectable } from '@angular/core';
import { Subject } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subject = new Subject();

  constructor() { }

  sendMsg(producto) {
    console.log(producto);
    this.subject.next(producto) //Triggering an event
  }

  getMsg() {
    return this.subject.asObservable()
  }
}
