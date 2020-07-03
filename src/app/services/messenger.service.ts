import { Injectable } from '@angular/core';
import { Subject } from  'rxjs';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subject = new Subject();

  constructor() { }

  sendMsg(producto: Producto, cantidad: number) {
    
    this.subject.next({Producto: producto, Cantidad: cantidad}) //Triggering an event

    if (!localStorage.getItem('codigo'))
    {
      localStorage.setItem('codigo', '' + producto.id)
      localStorage.setItem('nombre', producto.nombre)
      localStorage.setItem('detalle', producto.detalle)
      localStorage.setItem('precioSu', '' + producto.precioSu)
      localStorage.setItem('fotoArt', producto.fotoArt)
      localStorage.setItem('cantidad', '' + cantidad)
    } 
    else {
      var codigo = localStorage.getItem('codigo') + '|' + producto.id
      localStorage.setItem('codigo', codigo)
      var nombre = localStorage.getItem('nombre') + '|' + producto.nombre
      localStorage.setItem('nombre', nombre)
      var detalle = localStorage.getItem('detalle') + '|' + producto.detalle
      localStorage.setItem('detalle', detalle)
      var precioSu = localStorage.getItem('precioSu') + '|' + producto.precioSu
      localStorage.setItem('precioSu', precioSu)
      var fotoArt = localStorage.getItem('fotoArt') + '|' + producto.fotoArt
      localStorage.setItem('fotoArt', fotoArt)
      var cantidadP = localStorage.getItem('cantidad') + '|' + cantidad
      localStorage.setItem('cantidad', cantidadP)
    }
  }

  getMsg()
  {
    return this.subject.asObservable()
  }

  sendDeleteMsg()
  {
    this.subject.next()
  }

}
