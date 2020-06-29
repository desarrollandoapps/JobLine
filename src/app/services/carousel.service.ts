import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  private carouselMessage = new BehaviorSubject<boolean>(true);
  carousel = this.carouselMessage.asObservable();

  constructor() { }

  updateCarouselMessage(nuevoMensaje: boolean) 
  {
    this.carouselMessage.next(nuevoMensaje);
  }

  getCarousel()
  {
    return this.carousel;
  }
}
