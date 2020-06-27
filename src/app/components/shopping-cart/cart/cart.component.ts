import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems = [];
  cartTotal = 0;

  constructor(private msg: MessengerService) { }

  ngOnInit(): void {
    this.msg.getMsg().subscribe((producto: Producto) => {
      this.addProductToCart(producto);
    });
    this.obtenerProductos();
  }

  obtenerProductos()
  {
    if (localStorage.getItem('codigo'))
    {
      var codigosStr = localStorage.getItem('codigo')
      var codigos = codigosStr.split('|')
      var nombresStr = localStorage.getItem('nombre')
      var nombres = nombresStr.split('|')
      var detalleStr = localStorage.getItem('detalle')
      var detalles = detalleStr.split('|')
      var precioStr = localStorage.getItem('precioSu')
      var precios = precioStr.split('|')
      var fotoStr = localStorage.getItem('fotoArt')
      var fotos = fotoStr.split('|')

      for (var i = 0; i < codigos.length; i++)
      {
        this.cartItems.push({
          id: codigos[i],
          cantidad: 1,
          nombre: nombres[i],
          precioSu: precios[i],
          foto: fotos[i]
        });
      }

    }
  }

  addProductToCart(producto: Producto) {

    let existe:boolean = this.productExist(producto);
    
    if (!existe) {
      this.cartItems.push({
        id: producto.id,
        cantidad: 1,
        nombre: producto.nombre,
        precioSu: producto.precioSu
      });
    }
      
    this.cartTotal = 0;
    this.cartItems.forEach(item => {
      this.cartTotal += item.cantidad * item.precioSu;
    });
  }

  productExist(producto): boolean {
    let existe = false;
    for ( let i in this.cartItems ) {
      if ( this.cartItems[i].id === producto.id ) {
        this.cartItems[i].cantidad++;
        existe = true;
        return existe;
      }
    }
    return existe;
  }
}
