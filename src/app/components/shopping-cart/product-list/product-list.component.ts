import { Component, OnInit, Input } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from 'src/app/interfaces/producto';
import { FormControl } from '@angular/forms';
import { BuscadorService } from 'src/app/services/buscador.service';
import { FiltrarServiceDesde } from 'src/app/services/filtrarDesde.service';
import { FiltrarServiceHasta } from 'src/app/services/filtrarHasta.service';
import { FiltrarServiceCategoria } from 'src/app/services/filtrarCategoria.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  valorFiltro: string;
  valorDesde: string;
  valorHasta: string;
  valorCateg: string;

  API_ENDPOINT = 'http://joblinefree.com:98/api/articulo/search/';

  productos: Producto[];

  constructor( private buscadorService: BuscadorService, private productoService: ProductosService,
               private httpClient: HttpClient, private filtarServiceDesde: FiltrarServiceDesde,
               private filtrarServiceHasta: FiltrarServiceHasta, private filtrarServiceCateg: FiltrarServiceCategoria ) {
    this.buscadorService.broadcast.subscribe( valor => this.valorFiltro = valor );
    this.filtarServiceDesde.broadcast.subscribe( desde => this.valorDesde = desde );
    this.filtrarServiceHasta.broadcast.subscribe( hasta => this.valorHasta = hasta );
    this.filtrarServiceCateg.broadcast.subscribe( categ => this.valorCateg = categ );

    // console.log('filtro: ' + this.valorFiltro);
    // console.log('desde: ' + this.valorDesde );
    // console.log('hasta: ' + this.valorHasta );
    // console.log('categ: ' + this.valorCateg );

    httpClient.get(this.API_ENDPOINT).subscribe((data: Producto[]) => {
      this.productos = data;
    });
    
  }

  ngOnInit(): void {
  }

}

