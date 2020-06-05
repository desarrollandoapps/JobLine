import { Component, OnInit, Input } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { HttpClient } from '@angular/common/http';
import { Producto } from 'src/app/interfaces/producto';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() valorFiltro: string;

  API_ENDPOINT = 'http://joblinefree.com:98/api/articulo/search/';
  
  productos: Producto[];

  search = new FormControl('');

  constructor(private productoService: ProductosService, private httpClient:HttpClient) { 
    httpClient.get(this.API_ENDPOINT).subscribe((data: Producto[]) => {
      this.productos = data;
    });
  }

  ngOnInit(): void {
  }

}
