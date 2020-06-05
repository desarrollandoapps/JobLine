import { Component, OnInit, Input } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';
import { MessengerService} from 'src/app/services/messenger.service'

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  over: string;

  @Input() producto: Producto;

  constructor(private msg: MessengerService) { 
    this.over = 'none';
  }

  ngOnInit(): void {
  }

  handleAddToCart() {
    this.msg.sendMsg(this.producto)
  }

}
