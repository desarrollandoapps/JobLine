import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(lista: any[], search:string): any[] {
    console.log(search);
    
    if (!search) return lista;

    search = (search.normalize('NFD').replace(/[\u0300-\u036f]/g,'')).toLowerCase();
    return lista.filter(producto => (producto.nombre.normalize('NFD').replace(/[\u0300-\u036f]/g,'')).toLowerCase().includes(search))
  }

}
