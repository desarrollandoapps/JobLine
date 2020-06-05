import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css','../../../../assets/css/fontawesome/css/all.min.css']
})
export class NavComponent implements OnInit {

  search = new FormControl('');
  
  constructor() { }

  ngOnInit(): void {
    this.search.valueChanges
    .pipe(debounceTime(300))
    .subscribe(value => this.searchEmmiter.emit(value));
  }

  @Output('search') searchEmmiter = new EventEmitter<string>();

}
