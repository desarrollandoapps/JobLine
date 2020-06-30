import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';
import { Producto } from 'src/app/interfaces/producto';
import { CarouselService } from 'src/app/services/carousel.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems = [];
  cartTotal = 0;

  constructor(private msg: MessengerService, private carouselService: CarouselService,
              private router: Router) { 
    this.carouselService.updateCarouselMessage(false)
  }

  ngOnInit(): void {
    this.msg.getMsg().subscribe((producto: Producto) => {
      if (producto !== null && producto !== undefined) {
        this.addProductToCart(producto);
      }
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

  borrarProducto(item): void
  {
    Swal.fire({
      title: '¿Está seguro de eliminar el producto?',
      text: "¡Esta acción no se podrá deshacer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#C73A3F'
    }).then((result) => {
      if (result.value) {
        this.eliminarProducto(item)
        this.msg.sendDeleteMsg()
        Swal.fire(
          '¡Eliminado!',
          'El producto ha sido eliminado del carrito de compras.',
          'success'
        )
        this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>
          this.router.navigate(["carrito"])); 
      }
    })
  }

  eliminarProducto(item):void {
    console.log(item);

    var codigosStr = localStorage.getItem('codigo')
    var codigos = codigosStr.split('|')
    var nombresStr = localStorage.getItem('nombre')
    var nombres = nombresStr.split('|')
    var cantidadesStr = localStorage.getItem('cantidad')
    var cantidades = cantidadesStr.split('|')
    var descripcionesStr = localStorage.getItem('detalle')
    var descripciones = descripcionesStr.split('|')
    var preciosStr = localStorage.getItem('precioSu')
    var precios = preciosStr.split('|')
    var fotosStr = localStorage.getItem('fotoArt')
    var fotos = fotosStr.split('|')

    var posicion = this.buscarTodosProductos(item.id)

    if (posicion.length > 0)
    {
      posicion.forEach(p => {
        var pos = this.buscarProducto(item.id)
        
        codigos.splice(pos, 1)
        nombres.splice(pos, 1)
        cantidades.splice(pos, 1)
        descripciones.splice(pos, 1)
        precios.splice(pos, 1)
        fotos.splice(pos, 1)
        
        localStorage.removeItem('codigo')
        localStorage.removeItem('nombre')
        localStorage.removeItem('cantidad')
        localStorage.removeItem('detalle')
        localStorage.removeItem('precioSu')
        localStorage.removeItem('fotoArt')
        for(var i:number = 0; i < codigos.length; i++) 
        {
          if (localStorage.getItem('codigo') === null)
          {
            localStorage.setItem('codigo', codigos[i])
            localStorage.setItem('nombre', nombres[i])
            localStorage.setItem('cantidad', cantidades[i])
            localStorage.setItem('detalle', descripciones[i])
            localStorage.setItem('precioSu', precios[i])
            localStorage.setItem('fotoArt', fotos[i])
          }
          else {
            localStorage.setItem('codigo', localStorage.getItem('codigo') + '|' + codigos[i])
            localStorage.setItem('nombre', localStorage.getItem('nombre') + '|' + nombres[i])
            localStorage.setItem('cantidad', localStorage.getItem('cantidad') + '|' + cantidades[i])
            localStorage.setItem('detalle', localStorage.getItem('detalle') + '|' + descripciones[i])
            localStorage.setItem('precioSu', localStorage.getItem('precioSu') + '|' + precios[i])
            localStorage.setItem('fotoArt', localStorage.getItem('fotoArt') + '|' + fotos[i])
          }
        }
      });
    }
  }

  buscarTodosProductos(codigo:string): number[] {
    var posiciones = []

    var codigosStr = localStorage.getItem('codigo')
    var codigosFull = codigosStr.split('|')

    for(var i:number = 0; i < codigosFull.length; i++)
    {
      if ( codigosFull[i] === codigo) {
        posiciones.push(i)
      }
    }
    console.log('Posiciones: ' + posiciones)
    return posiciones
  }

  buscarProducto(codigo:string): number {
    var posicion = -1
    var codigosStr = localStorage.getItem('codigo')
    var codigosFull = codigosStr.split('|')

    for(var i:number = 0; i < codigosFull.length; i++)
    {
      if ( codigosFull[i] === codigo) {
        posicion = i
        break
      }
    }
    console.log('Posición: ' + posicion)
    return posicion
  }

}
