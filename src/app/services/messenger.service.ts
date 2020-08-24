import { Injectable } from '@angular/core';
import { Subject } from  'rxjs';
import { Producto } from '../interfaces/producto';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subject = new Subject();
  cartItems = [];

  constructor(private localService: LocalService) { }

  sendMsg(producto: Producto, cantidad: number):boolean {
    this.obtenerProductos();
    if((producto.stock - (Number(this.darCantidadProducto(producto.id)) + Number(cantidad))) >= 0) {
      this.subject.next({Producto: producto, Cantidad: cantidad}) //Triggering an event
  
      if (!this.localService.getItem('codigo'))
      {
        this.localService.setItem('codigo', '' + producto.id)
        this.localService.setItem('nombre', producto.nombre)
        this.localService.setItem('detalle', producto.detalle)
        this.localService.setItem('precioSu', '' + producto.precioSu)
        this.localService.setItem('fotoArt', producto.fotoArt)
        this.localService.setItem('cantidad', '' + cantidad)
      } 
      else {
        var codigo = this.localService.getItem('codigo') + '|' + producto.id
        this.localService.setItem('codigo', codigo)
        var nombre = this.localService.getItem('nombre') + '|' + producto.nombre
        this.localService.setItem('nombre', nombre)
        var detalle = this.localService.getItem('detalle') + '|' + producto.detalle
        this.localService.setItem('detalle', detalle)
        var precioSu = this.localService.getItem('precioSu') + '|' + producto.precioSu
        this.localService.setItem('precioSu', precioSu)
        var fotoArt = this.localService.getItem('fotoArt') + '|' + producto.fotoArt
        this.localService.setItem('fotoArt', fotoArt)
        var cantidadP = this.localService.getItem('cantidad') + '|' + cantidad
        this.localService.setItem('cantidad', cantidadP)
      }
      return true;
    }
    return false;
  }

  obtenerProductos()
  {
    this.cartItems = [];
    if (this.localService.getItem('codigo'))
    {
      var codigosStr = this.localService.getItem('codigo')
      var codigos = codigosStr.split('|')
      var cantidadStr = this.localService.getItem('cantidad')
      var cantidad = cantidadStr.split('|')

      for (var i = 0; i < codigos.length; i++)
      {
        var existe:boolean = this.existeProducto(codigos[i], parseInt(cantidad[i]))

        if (!existe)
        {
          this.cartItems.push({
            id: codigos[i],
            cantidad: cantidad[i]
          });
        }        
      }
    }
  }

  existeProducto(codigo: string, cantidad:number): boolean {
    let existe = false;
    for ( let i in this.cartItems ) {
      if ( this.cartItems[i].id === codigo ) {
        this.cartItems[i].cantidad = parseInt(this.cartItems[i].cantidad) + cantidad;
        existe = true;
        return existe;
      }
    }
    return existe;
  }
  
  darCantidadProducto(codigo: number): number {
    let cantidad:number = 0;
    for ( let i in this.cartItems ) {
      if ( this.cartItems[i].id == codigo ) {
        cantidad += parseInt(this.cartItems[i].cantidad);
        return cantidad;
      }
    }
    return cantidad;
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
