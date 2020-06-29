import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';
import { Producto } from 'src/app/interfaces/producto';
import { CarouselService } from 'src/app/services/carousel.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems = [];
  cartTotal = 0;

  //TODO: Unir productos repetidos

  constructor(private msg: MessengerService, private carouselService: CarouselService) { 
    this.carouselService.updateCarouselMessage(false)
  }

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
      var cantidadStr = localStorage.getItem('cantidad')
      var cantidad = cantidadStr.split('|')

      for (var i = 0; i < codigos.length; i++)
      {
        var existe:boolean = this.existeProducto(codigos[i], parseInt(cantidad[i]))

        if (!existe)
        {
          this.cartItems.push({
            id: codigos[i],
            cantidad: cantidad[i],
            nombre: nombres[i],
            precioSu: precios[i],
            foto: fotos[i]
          });
        }        
      }
      this.cartTotal = 0;
      this.cartItems.forEach(item => {
        this.cartTotal += item.cantidad * item.precioSu;
      });
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
        this.cartItems[i].cantidad++ ;
        existe = true;
        return existe;
      }
    }
    return existe;
  }

}
