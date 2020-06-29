import { Component, Output } from '@angular/core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { AuthTokenService } from './services/auth-token.service';
import { CarouselService } from './services/carousel.service';
import { ParsedVariable } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '../assets/css/fontawesome/css/all.min.css',
  ]
})
export class AppComponent {
  title = 'JobLine';
  faFacebookF = faFacebookF;
  faInstagram = faInstagram;
  faYoutube = faYoutube;

  valorFiltro = '';
  cargar: boolean = false;
  carousel: boolean = true;

  constructor(private authToken: AuthTokenService, private carouselService: CarouselService) {

    this.carouselService.getCarousel().subscribe((valor: boolean) => {
      this.carousel = valor
    })

    if (localStorage.getItem('token'))
    {
      this.cargar = true;
    }
    if (localStorage.getItem('cargar'))
    {
      this.cargar = false;
      localStorage.removeItem('cargar')
    }
  }

  handleSearch(search: string) {
    this.valorFiltro = search;
  }

  @Output('valorFiltro') valor:string;

  ingresar() :void
  {
    location.reload();
  }

}
