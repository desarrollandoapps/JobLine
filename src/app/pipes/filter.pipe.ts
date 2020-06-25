import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform( lista: any[], filtro: string[] ): any[] {
    // console.log( 'Pipe filtros: ' + filtro );

    if ( !filtro ) {
      return lista;
    }

    // Se evalúan cada uno de los filtros

    if ( filtro[0] !== '' ) {
      lista = lista.filter( producto => producto.precioSu >= filtro[0] );
      // console.log( lista );
    }

    if ( filtro[1] !== '' ) {
      lista = lista.filter( producto => producto.precioSu <= filtro[1] );
      // console.log( lista );
    }

    // console.log( 'Filtro 2: ' + filtro[2] );

    if ( filtro[2] !== '' ) {
      // tslint:disable-next-line: radix
      lista = lista.filter( producto => producto.categoriaId === parseInt( filtro[2].toString() ) );
      // console.log( lista );
    }

    return lista;
  }

}
