import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators'
import { Globals } from 'src/app/globals';
import { Subject } from 'rxjs';
import { BuscadorService } from 'src/app/services/buscador.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css','../../../../assets/css/fontawesome/css/all.min.css']
})
export class NavComponent implements OnInit {

  buscarSubject: Subject<string> = new Subject<string>();

  valBuscar: string;

  search = new FormControl('');
  
  constructor(private globals: Globals, private buscadorService: BuscadorService) { 
    this.buscarSubject.subscribe(valor => this.valBuscar = valor);
  }

  ngOnInit(): void {
    this.buscadorService.broadcast.subscribe(broadcast => this.valBuscar = broadcast);
    // this.search.valueChanges
    // .pipe(debounceTime(300))
    // .subscribe(value => this.searchEmmiter.emit(value));
  }

  // @Output('search') searchEmmiter = new EventEmitter<string>();

  public buscarItem(buscarInput: HTMLInputElement)
  {
    this.buscadorService.updateBroadcastMessage(buscarInput.value)
    console.log(buscarInput.value);
    
    // this.buscarSubject.next(this.valBuscar);
    // this.globals.valBuscar = this.valBuscar;
  }

}
