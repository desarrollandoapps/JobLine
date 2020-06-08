import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  producto: Producto;
  elementos: number[];

  constructor(private globals: Globals) { 
    this.producto = globals.producto;
    this.elementos = new Array();
  }

  ngOnInit(): void {
    for(var i = 1; i <= this.producto.stock; i++)
    {
      console.log(i);
      
      this.elementos.push(i);
      if ( i == 5 )
      {
        break;
      }
    }
  }

}
