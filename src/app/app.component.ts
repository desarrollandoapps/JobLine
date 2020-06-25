import { Component, Output } from '@angular/core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { AuthTokenService } from './services/auth-token.service';

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

  constructor(private authToken: AuthTokenService) {
    
  }

  handleSearch(search: string) {
    this.valorFiltro = search;
  }

  @Output('valorFiltro') valor:string;

}
