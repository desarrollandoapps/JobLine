import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators'
import { Globals } from 'src/app/globals';
import { Subject } from 'rxjs';
import { FiltrarServiceDesde } from 'src/app/services/filtrarDesde.service';
import { FiltrarServiceHasta } from 'src/app/services/filtrarHasta.service';
import { FiltrarServiceCategoria } from 'src/app/services/filtrarCategoria.service';
import { HttpClient } from '@angular/common/http';
import { Categoria } from 'src/app/interfaces/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  // Atributos
  desdeSubject: Subject<string> = new Subject<string>();
  hastaSubject: Subject<string> = new Subject<string>();
  categoriaSubject: Subject<string> = new Subject<string>();

  valDesde: string;
  valHasta: string;
  valCategoria: string;

  desde = new FormControl('');
  hasta = new FormControl('');
  categoria = new FormControl('');

  API_ENDPOINT = 'http://joblinefree.com:98/api/categoria';

  categorias: Categoria[];

  // Metodo Constructor
  constructor( private globals: Globals, private filtrarServiceDesde: FiltrarServiceDesde,
               private filtrarServiceHasta: FiltrarServiceHasta, private filtrarServiceCategoria: FiltrarServiceCategoria,
               private categoriaService: CategoriaService, private httpClient: HttpClient ) {
    this.desdeSubject.subscribe( valorDesde => this.valDesde = valorDesde );
    this.hastaSubject.subscribe( valorHasta => this.valHasta = valorHasta );
    this.categoriaSubject.subscribe( valorCategoria => this.valCategoria = valorCategoria );

    httpClient.get(this.API_ENDPOINT).subscribe((data: Categoria[]) => {
      this.categorias = data;
    });

  }

  // Eventos
  ngOnInit(): void {
    this.filtrarServiceDesde.broadcast.subscribe( broadcastDesde => this.valDesde = broadcastDesde );
    this.filtrarServiceHasta.broadcast.subscribe( broadcastHasta => this.valHasta = broadcastHasta );
    this.filtrarServiceCategoria.broadcast.subscribe( broadcastCategoria => this.valCategoria = broadcastCategoria );
  }

  // Metodos
  public filtrarItems(desdeInput: HTMLInputElement, hastaInput: HTMLInputElement, categInput: HTMLInputElement) {
    this.filtrarServiceDesde.updateBroadcastMessage( desdeInput.value );
    this.filtrarServiceHasta.updateBroadcastMessage( hastaInput.value );
    this.filtrarServiceCategoria.updateBroadcastMessage( categInput.value );

    console.log( 'Desde: ' + desdeInput.value );
    console.log( 'Hasta: ' + hastaInput.value );
    console.log( 'Categoria: ' + categInput.value );
  }

}
