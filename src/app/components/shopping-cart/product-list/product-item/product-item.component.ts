import { Component, OnInit, Input } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';
import { MessengerService} from 'src/app/services/messenger.service'
import { Globals } from 'src/app/globals';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() producto: Producto;

  constructor(private msg: MessengerService, private globals: Globals) {    
  }

  ngOnInit(): void {
  }

  handleAddToCart() {
    this.msg.sendMsg(this.producto)
    // alert('Ha agregado al carrito de compras el producto: \n' + this.producto.nombre)
    Swal.fire(
      'Ha agregado un producto al carrito de compras',
      this.producto.nombre,
      'success'
    )
  }

  public cargarProducto(producto: Producto)
  {
    this.globals.producto = producto;
    // console.log(this.globals.producto);
  }

}
