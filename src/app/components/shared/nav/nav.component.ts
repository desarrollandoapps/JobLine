import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators'
import { Globals } from 'src/app/globals';
import { Subject } from 'rxjs';
import { BuscadorService } from 'src/app/services/buscador.service';
import { HttpClient } from '@angular/common/http';
import { Categoria } from 'src/app/interfaces/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { FiltrarServiceCategoria } from 'src/app/services/filtrarCategoria.service';
import {ViewChild} from '@angular/core';

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

  @ViewChild('itemId') itemId;

  search = new FormControl('');

  API_ENDPOINT = 'http://joblinefree.com:98/api/categoria';

  categorias: Categoria[];

  constructor(private globals: Globals, private buscadorService: BuscadorService,
              private categoriaService: CategoriaService, private httpClient: HttpClient,
              private filtrarServiceCategoria: FiltrarServiceCategoria ) {
    this.buscarSubject.subscribe(valor => this.valBuscar = valor);
    this.filtrarServiceCategoria.broadcast.subscribe( categ => this.valorCateg = categ );

    httpClient.get(this.API_ENDPOINT).subscribe((data: Categoria[]) => {
      this.categorias = data;
    });

    this.cantProd = 0;

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

}
