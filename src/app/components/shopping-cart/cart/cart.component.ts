import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';
import { Producto } from 'src/app/interfaces/producto';
import { CarouselService } from 'src/app/services/carousel.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems = [];
  cartTotal = 0;

  constructor(private msg: MessengerService, private carouselService: CarouselService,
              private router: Router, private localService: LocalService) { 
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
    if (this.localService.getItem('codigo'))
    {
      var codigosStr = this.localService.getItem('codigo')
      var codigos = codigosStr.split('|')
      var nombresStr = this.localService.getItem('nombre')
      var nombres = nombresStr.split('|')
      var detalleStr = this.localService.getItem('detalle')
      var detalles = detalleStr.split('|')
      var precioStr = this.localService.getItem('precioSu')
      var precios = precioStr.split('|')
      var fotoStr = this.localService.getItem('fotoArt')
      var fotos = fotoStr.split('|')
      var cantidadStr = this.localService.getItem('cantidad')
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

    var codigosStr = this.localService.getItem('codigo')
    var codigos = codigosStr.split('|')
    var nombresStr = this.localService.getItem('nombre')
    var nombres = nombresStr.split('|')
    var cantidadesStr = this.localService.getItem('cantidad')
    var cantidades = cantidadesStr.split('|')
    var descripcionesStr = this.localService.getItem('detalle')
    var descripciones = descripcionesStr.split('|')
    var preciosStr = this.localService.getItem('precioSu')
    var precios = preciosStr.split('|')
    var fotosStr = this.localService.getItem('fotoArt')
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
        
        this.localService.removeItem('codigo')
        this.localService.removeItem('nombre')
        this.localService.removeItem('cantidad')
        this.localService.removeItem('detalle')
        this.localService.removeItem('precioSu')
        this.localService.removeItem('fotoArt')
        for(var i:number = 0; i < codigos.length; i++) 
        {
          if (this.localService.getItem('codigo') === null)
          {
            this.localService.setItem('codigo', codigos[i])
            this.localService.setItem('nombre', nombres[i])
            this.localService.setItem('cantidad', cantidades[i])
            this.localService.setItem('detalle', descripciones[i])
            this.localService.setItem('precioSu', precios[i])
            this.localService.setItem('fotoArt', fotos[i])
          }
          else {
            this.localService.setItem('codigo', this.localService.getItem('codigo') + '|' + codigos[i])
            this.localService.setItem('nombre', this.localService.getItem('nombre') + '|' + nombres[i])
            this.localService.setItem('cantidad', this.localService.getItem('cantidad') + '|' + cantidades[i])
            this.localService.setItem('detalle', this.localService.getItem('detalle') + '|' + descripciones[i])
            this.localService.setItem('precioSu', this.localService.getItem('precioSu') + '|' + precios[i])
            this.localService.setItem('fotoArt', this.localService.getItem('fotoArt') + '|' + fotos[i])
          }
        }
      });
    }
  }

  buscarTodosProductos(codigo:string): number[] {
    var posiciones = []

    var codigosStr = this.localService.getItem('codigo')
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
    var codigosStr = this.localService.getItem('codigo')
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
