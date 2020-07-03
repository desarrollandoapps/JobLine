import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Globals } from 'src/app/globals';
import { Subject } from 'rxjs';
import { BuscadorService } from 'src/app/services/buscador.service';
import { HttpClient } from '@angular/common/http';
import { Categoria } from 'src/app/interfaces/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { FiltrarServiceCategoria } from 'src/app/services/filtrarCategoria.service';
import {ViewChild} from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';
import { CarouselService } from 'src/app/services/carousel.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css','../../../../assets/css/fontawesome/css/all.min.css']
})
export class NavComponent implements OnInit {

  buscarSubject: Subject<string> = new Subject<string>();
  categoriaSubject: Subject<string> = new Subject<string>();

  valBuscar: string;
  valorCateg: string;
  cantProd: number;
  showCat: boolean = true;

  @ViewChild('itemId') itemId;

  search = new FormControl('');

  API_ENDPOINT = 'http://joblinefree.com:98/api/categoria';

  categorias: Categoria[];
  productos = new Array();

  constructor(private globals: Globals, private buscadorService: BuscadorService,
              private categoriaService: CategoriaService, private httpClient: HttpClient,
              private filtrarServiceCategoria: FiltrarServiceCategoria, private msg: MessengerService,
              private carouselService: CarouselService ) {

    this.buscarSubject.subscribe(valor => this.valBuscar = valor);
    this.filtrarServiceCategoria.broadcast.subscribe( categ => this.valorCateg = categ );
    
    this.carouselService.getCarousel().subscribe((valor: boolean) => {
      this.showCat = valor
    })

    httpClient.get(this.API_ENDPOINT).subscribe((data: Categoria[]) => {
      this.categorias = data;
    });

    this.msg.getMsg().subscribe((prods: any[]) => {
      console.log('Cambio en productos ' + prods)
      if (prods !== null && prods !== undefined) {
        this.productos.push(prods['Producto'].codigo)
        this.cantProd = this.contar(this.productos);
      }
      else {
        this.cantProd = this.contarProductos();
      }
    })

    this.cantProd = this.contarProductos();

  }

  ngOnInit(): void {
    this.buscadorService.broadcast.subscribe(broadcast => this.valBuscar = broadcast);
  }

  public buscarItem(buscarInput: HTMLInputElement)
  {
    if (buscarInput === null)
    {
      this.buscadorService.updateBroadcastMessage('');
      this.valBuscar = '';
    }
    else if (buscarInput)
    {
      this.buscadorService.updateBroadcastMessage(buscarInput.value);
    }
  }

  public mostrarTodas( id: string) {
    console.log( 'Click: ' + id );
  }

  public filtrarPorCategoria( id: string ) {
    this.filtrarServiceCategoria.updateBroadcastMessage(  id );
  }

  public contarProductos(): number
  {
    this.productos = []
    if (localStorage.getItem('codigo'))
    {
      var productosStr = localStorage.getItem('codigo')
      var productosFull = productosStr.split('|')

      this.productos.push( productosFull[0] )

      for (var i:number = 0; i < productosFull.length; i++) 
      {
        if( !this.productos.includes(productosFull[i]) )
        {
          this.productos.push(productosFull[i])
        }        
      }  
    }
      return this.productos.length
  }

  public contar(productosOrigen: any[]): number
  {
    this.productos = []
    // this.productos.push( productosOrigen[productosOrigen.length - 1] )
    // this.productos.forEach(p => {
    //   console.log('Productos antes: ' + p)
    // })
    
    productosOrigen.forEach(p => {
      console.log('Productos origen In: ' + p)
      if( !this.productos.includes(p) )
      {
        console.log('P: ' + p)
        this.productos.push(p)
      }
    })
    // for (var i:number = 0; i < productosOrigen.length; i++) 
    // {
    //   console.log('Productos Origen: ' + productosOrigen[i] + ' - i: ' + i)
    //   if( !this.productos.includes(productosOrigen[i]) && productosOrigen[i] !== undefined )
    //   {
    //     this.productos.push(productosOrigen[i])
    //   }        
    // }  
    productosOrigen.forEach(p => {
      console.log('Productos origen Afuera: ' + p)
    })
    this.productos.forEach(p => {
      console.log('Productos Afuera: ' + p)
    })
    return this.productos.length
  }
}
