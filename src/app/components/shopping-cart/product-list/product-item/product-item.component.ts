import { Component, OnInit, Input } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  over: string;

  @Input() producto: Producto;

  constructor() { 
    this.over = 'none';
  }

  ngOnInit(): void {
  }

}
