import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  @Input() valor_filtro: string;

  busco = false;

  constructor() { }

  ngOnInit(): void {
    //TODO: cambiar valor de busco según valor_filtro
  }

}
