import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';
import { Producto } from 'src/app/interfaces/producto';
import { MessengerService } from 'src/app/services/messenger.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  producto: Producto;
  cantidad: number = 1;
  elementos: number[];

  constructor(private msg: MessengerService, private globals: Globals) { 
    this.producto = globals.producto;
    this.elementos = new Array();
  }

  ngOnInit(): void {
    for(var i = 1; i <= this.producto.stock; i++) {      
      this.elementos.push(i);
      if ( i == 5 ) {
        break;
      }
    }
  }

  handleAddToCart() {
    console.log('Cantidad: ' + this.cantidad);
    this.msg.sendMsg(this.producto, this.cantidad)
    Swal.fire(
      'Ha agregado un producto al carrito de compras',
      this.producto.nombre,
      'success'
    )
  }

}
