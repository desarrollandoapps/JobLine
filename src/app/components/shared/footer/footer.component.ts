import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  abrirModal() {
    Swal.fire({
      title: '¡Suscríbete!',
      text: '¡No te quedes atrás! Sé parte de nuestra amplia comunidad y conoce a detalle todas nuestras novedades.',
      input: 'email',
      inputPlaceholder: 'Escribe tu correo electrónico',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      
    });
  }

}
