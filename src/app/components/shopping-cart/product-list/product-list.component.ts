import { Component, OnInit, Input } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { HttpClient } from '@angular/common/http';
import { Producto } from 'src/app/interfaces/producto';
import { FormControl } from '@angular/forms';
import { BuscadorService } from 'src/app/services/buscador.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  valorFiltro: string;

  API_ENDPOINT = 'http://joblinefree.com:98/api/articulo/search/';
  
  productos: Producto[];

  constructor(private buscadorService: BuscadorService, private productoService: ProductosService, private httpClient:HttpClient) { 
    this.buscadorService.broadcast.subscribe(valor => this.valorFiltro = valor);
    console.log(this.valorFiltro);
    
    httpClient.get(this.API_ENDPOINT).subscribe((data: Producto[]) => {
      this.productos = data;
    });
  }

  ngOnInit(): void {
  }

}
