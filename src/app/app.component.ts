import { Component } from '@angular/core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

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
}
