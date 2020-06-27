import { Component, OnInit, Input } from '@angular/core';
import { Globals } from 'src/app/globals';
import { BuscadorService } from 'src/app/services/buscador.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  valorFiltro: string;

  constructor(private buscadorService: BuscadorService) { 
    this.buscadorService.broadcast.subscribe( valor => this.valorFiltro = valor );
    // console.log('filtro en shopping-cart: ' + this.valorFiltro);
  }

  ngOnInit(): void { }

}
