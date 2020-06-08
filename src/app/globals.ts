import { Injectable } from '@angular/core';
import { Producto } from './interfaces/producto';

@Injectable()
export class Globals {
  valBuscar: string = '';
  producto: Producto = null;
}