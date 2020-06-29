import { Component, OnInit, Input } from '@angular/core';
import { Globals } from 'src/app/globals';
import { BuscadorService } from 'src/app/services/buscador.service';
import { CarouselService } from 'src/app/services/carousel.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  valorFiltro: string;

  constructor(private buscadorService: BuscadorService, private carouselService: CarouselService) { }

  ngOnInit(): void { 
    this.buscadorService.broadcast.subscribe( valor => this.valorFiltro = valor );
    this.carouselService.updateCarouselMessage(true)
  }

}
